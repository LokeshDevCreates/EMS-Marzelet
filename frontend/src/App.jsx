
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

// Your Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Payment from "./pages/Payment";
import EventDetails from "./pages/EventDetails";
import Bank from "./pages/Bank";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import ResetPassword from "./pages/ResetPassword";
import MainSettings from "./pages/Settings"

// Organizer Pages
import OrganizerForm from "./pages/organizer/organizerPages/OrganizerForm";
import OrgDashboard from "./pages/organizer/organizerPages/OrgDashboard";
import OrganizerDashboard from "./pages/organizer/organizerPages/OrganizerDashboard";
import EventManager from "./pages/organizer/organizerPages/EventManager";
import BookingViewer from "./pages/organizer/organizerPages/BookingViewer";
import OrganizerProfile from "./pages/organizer/organizerPages/OrganzierProfile";
import ShowEvents from "./pages/organizer/organizerPages/ShowEvents";
import CheckOrganizerStatus from "./pages/organizer/organizerPages/CheckOrganizerStatus";
import CheckAttendeeStatus from "./pages/CheckAttendeeStatus"
import OrganizerSettings from "./pages/organizer/organizerPages/OrganizerSettings";


// Admin Dashboard and Nested Pages
import AdminDashboard from "./pages/admin/adminpages/AdminDashboard";
import Dashboard from "./pages/admin/adminpages/Dashboard";
import Events from "./pages/admin/adminpages/Events";
import Organizers from "./pages/admin/adminpages/Organizers";
import Notifications from "./pages/admin/adminpages/Notifications";
import Settings from "./pages/admin/adminpages/Settings";
import AttendeeForm from "./pages/AttendeeForm"
// Utility Pages
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import OrganizerBankDetails from "./pages/organizer/organizerPages/OrganizerBankDetails";
import BookingSuccess from "./pages/BookingSucces";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/settings" element={<MainSettings />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/attendee-check" element={<CheckAttendeeStatus />} />
          <Route path="/attendee-form" element={<AttendeeForm />} />
          <Route path="/organizer-check" element={<CheckOrganizerStatus />} />
          <Route path="/organizer-form" element={<OrganizerForm />} />

          {/* Organizer Dashboard with Nested Routes */}
          <Route
            path="/organizer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["Organizer"]}>
                <OrgDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<OrganizerDashboard />} />
            <Route path="manage-events" element={<EventManager />} />
            <Route path="view-bookings" element={<BookingViewer />} />
            <Route path="profile" element={<OrganizerProfile />} />
            <Route path="show-events" element={<ShowEvents />} />
            <Route path="settings" element={<OrganizerSettings />} />
            <Route path="bank-details" element={<OrganizerBankDetails />} />
          </Route>

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
      </Router>
    </UserProvider>
  );
};

export default App;
