const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const userRoutes = require('./routes/userRoutes.js');
const organizerRoutes = require('./routes/organizerRoutes/organizerRoutes.js');
const Notification = require('./models/Notifications.js');
const notificationRoutes = require('./routes/notificationRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');
const paymentRoutes= require('./routes/paymentRoutes.js')
const mapRoutes=require('./routes/mapRoutes.js')
const bankRoutes=require('./routes/bankDetailsRoutes.js')
const attendeeRoutes=require('./routes/attendeeRoutes.js')
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.APPLICATION_URL, 
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// Validate environment variables
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set in the .env file");
  process.exit(1);
}

// MongoDB Connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
})();
const crypto = require("crypto");

const razorpay_order_id = "order_Qo6U7rC3GHbwIp"; // from step 3
const razorpay_payment_id = "pay_TEST123456789";  // any fake ID for test
const key_secret = "rIpnr3tnasH8Zq31jYU4GKvx";    // from .env

const signature = crypto
  .createHmac("sha256", key_secret)
  .update(razorpay_order_id + "|" + razorpay_payment_id)
  .digest("hex");

// Real-time Notification Functionality
const startNotificationStream = () => {
  try {
    const changeStream = mongoose.connection.watch(); // Watch the entire database

    changeStream.on('change', async (change) => {
      try {
        let title = '';
        let message = '';
        
        // Skip changes in the "notifications" collection to prevent recursion
        if (change.ns.coll === 'notifications') {
          return;
        }

        // Construct title and message based on the operation type
        switch (change.operationType) {
          case 'insert':
            title = 'New Document Added';
            message = `A new document was added to the "${change.ns.coll}" collection. Details: ${JSON.stringify(change.fullDocument, null, 2)}`;
            break;

          case 'update':
            const updatedFields = change.updateDescription.updatedFields;
            const removedFields = change.updateDescription.removedFields;
            title = 'Document Updated';
            message = `A document in the "${change.ns.coll}" collection was updated. \nUpdated fields: ${JSON.stringify(updatedFields, null, 2)} \nRemoved fields: ${removedFields.length > 0 ? JSON.stringify(removedFields, null, 2) : 'None'}`;
            break;

          case 'delete':
            title = 'Document Deleted';
            message = `A document was deleted from the "${change.ns.coll}" collection. Document ID: ${JSON.stringify(change.documentKey._id)}`;
            break;

          default:
            console.log('Unsupported operation type:', change.operationType);
            return;
        }

        console.log('Detected change:', {
          operationType: change.operationType,
          collection: change.ns.coll,
          documentKey: change.documentKey,
        });

        // Create and store the notification
        const notification = new Notification({
          title,
          message,
        });
        await notification.save();

        // Emit real-time notification to clients
        io.emit('notification', notification);
        console.log('New notification sent:', notification);
      } catch (err) {
        console.error('Error handling change stream event:', err);
      }
    });

    changeStream.on('error', (error) => {
      console.error('Change stream error:', error);
      setTimeout(startNotificationStream, 5000); // Restart the stream after a delay
    });

  } catch (error) {
    console.error('Error initializing notification change stream:', error);
  }
};

startNotificationStream();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/organizers', organizerRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/maps',mapRoutes)
app.use('/uploads', express.static('uploads'));

app.use('/api/payments', paymentRoutes);
app.use('/api/bank-details',bankRoutes)
app.use('/api/attendees', attendeeRoutes);
// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the User and Venue Management API');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal server error occurred.' });
});

// Cross-Origin Policies
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
