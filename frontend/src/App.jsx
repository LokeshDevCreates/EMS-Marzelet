import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import AttendeeDashboard from "./pages/attendee/AttendeeDashboard";
import AdminDashboard from "./pages/admin/adminpages/AdminDashboard";
import Events from "./pages/admin/adminpages/Events";
import Organizers from "./pages/admin/adminpages/Organizers";
import Notifications from "./pages/admin/adminpages/Notifications";
import Settings from "./pages/admin/adminpages/Settings";
import Dashboard from "./pages/admin/adminpages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import EventDetails from "./pages/EventDetails";
const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

 
          <Route path="/events/:eventId" element={<EventDetails />} /> 
          {/* Organizer Dashboard */}
          <Route
            path="/organizer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["Organizer"]}>
                <OrganizerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Attendee Dashboard */}
          <Route
            path="/attendee-dashboard"
            element={
              <ProtectedRoute allowedRoles={["Attendee"]}>
                <AttendeeDashboard />
              </ProtectedRoute>
            }
          />
          {/* Admin Dashboard with Nested Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="organizers" element={<Organizers />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 404 Not Found */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
