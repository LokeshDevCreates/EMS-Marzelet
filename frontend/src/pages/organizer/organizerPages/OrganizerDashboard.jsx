import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import EventIcon from "@mui/icons-material/Event";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useUser } from "../../../context/UserContext";
import axios from "axios";
import Footer from "../../../components/Footer"
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a6cee3", "#fb9a99"];

const OrganizerDashboard = () => {
  const { user } = useUser();
  const organizerId = user?._id || user?.id;
  const orgId=localStorage.getItem('organizerId')
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, bookingsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/events/organizer/${orgId}`),
          axios.get(`http://localhost:5000/api/bookings/organizer/${organizerId}/bookings`),
        ]);
        setEvents(eventsRes.data.events || []);
        setBookings(bookingsRes.data.bookings || []);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (organizerId,orgId) fetchData();
  }, [organizerId,orgId]);

  // Metrics
  const totalEvents = events.length;
  const totalBookings = bookings.reduce((sum, b) => sum + b.seats, 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amountPaid, 0);

  // Line Chart: Bookings per Month
  const monthlyBookings = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    bookings: 0,
  }));
  bookings.forEach((b) => {
    const monthIndex = new Date(b.createdAt).getMonth();
    monthlyBookings[monthIndex].bookings += b.seats;
  });

  // Pie Chart: Bookings by Event Type
  const typeMap = {};
  events.forEach((e) => {
    const type = Array.isArray(e.eventType) ? e.eventType[0] : e.eventType || "Other";
    const bookingCount = bookings
      .filter((b) => b.eventId?._id === e._id)
      .reduce((sum, b) => sum + b.seats, 0);
    typeMap[type] = (typeMap[type] || 0) + bookingCount;
  });
  const typeData = Object.entries(typeMap).map(([name, value]) => ({ name, value }));

  const cardData = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: <EventIcon fontSize="large" color="primary" />,
      bg: "#E3F2FD",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <BookOnlineIcon fontSize="large" color="success" />,
      bg: "#E8F5E9",
    },
    {
      title: "Revenue Generated",
      value: `₹ ${totalRevenue.toLocaleString()}`,
      icon: <TrendingUpIcon fontSize="large" color="warning" />,
      bg: "#FFF3E0",
    },
  ];

  return (
    <>
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Organizer Dashboard
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={10}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Summary Cards */}
          <Grid container spacing={3}>
            {cardData.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ backgroundColor: card.bg, boxShadow: 3 }}>
                  <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography variant="subtitle1" color="textSecondary">
                        {card.title}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {card.value}
                      </Typography>
                    </Box>
                    {card.icon}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Bookings Over Time
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyBookings}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#1976d2"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Bookings by Event Type
                  </Typography>
                  {typeData.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">
                      No booking data available.
                    </Typography>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={typeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {typeData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
    <div className="mt-20">
       <Footer />
    </div>
    </>
  );
};

export default OrganizerDashboard;
