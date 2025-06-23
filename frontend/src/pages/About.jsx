import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const About = () => {
  console.log(motion)
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col items-center px-4 md:px-10 lg:px-20 py-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to the Event Booking Management System (EBMS), your
            one-stop solution for managing events with efficiency and ease.
          </p>
        </motion.div>

        {/* Why Choose EBMS Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
          {/* Left Image Section */}
          <motion.div
            className="relative md:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="../../images/stadium.jpg"
              alt="Event Venue"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute bottom-[-20px] left-[-30px]">
              <img
                src="../../images/event2.jpg"
                alt="Hands Holding"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
            </div>
          </motion.div>

          {/* Right Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Why Choose EBMS?</h2>
            <ul className="list-decimal list-inside text-gray-600 space-y-4">
              <li>
                <strong>Event Planning and Coordination:</strong> Create and
                manage event timelines, budgets, and vendor coordination
                effortlessly.
              </li>
              <li>
                <strong>Venue Selection and Management:</strong> Select and
                manage the perfect venue for your event with real-time updates.
              </li>
              <li>
                <strong>Marketing and Promotion:</strong> Develop and execute
                marketing strategies to promote events effectively.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Project Goals Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Goals</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-4">
              <li>
                Create a centralized and automated system for managing event
                registrations and bookings.
              </li>
              <li>
                Improve the user experience for both organizers and attendees.
              </li>
              <li>
                Offer real-time updates and notifications for seamless
                communication.
              </li>
              <li>
                Ensure scalability to support events of all sizes, from small
                workshops to large-scale conferences.
              </li>
            </ul>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            className="flex justify-center md:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="../../images/goals.png"
              alt="Goals"
              className="rounded-lg shadow-lg w-full md:w-4/5"
            />
          </motion.div>
        </div>

        {/* Core Objectives Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
          {/* Left Image Section */}
          <motion.div
            className="justify-center hidden md:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="../../images/objectives.jpg"
              alt="Objectives"
              className="rounded-lg shadow-lg w-full md:w-4/5"
            />
          </motion.div>

          {/* Right Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Core Objectives</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-4">
              <li>
                Develop a secure, responsive web and mobile interface for users
                and organizers.
              </li>
              <li>
                Implement user authentication and profile management for
                personalized experiences.
              </li>
              <li>
                Enable event organizers to create, update, and manage event
                details with ease.
              </li>
              <li>
                Allow users to register, browse, and book events efficiently.
              </li>
              <li>
                Integrate a calendar/scheduling system for better planning and
                organization.
              </li>
              <li>
                Provide analytics and reporting tools to monitor user
                registrations and bookings.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
