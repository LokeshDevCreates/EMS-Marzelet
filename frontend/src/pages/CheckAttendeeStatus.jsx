import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckAttendeeStatus = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAttendeeStatus = async () => {
      const userEmail = localStorage.getItem("attendeeEmail");

      if (!userEmail) {
        navigate("/login"); // ⛔ Not logged in
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/attendees/by-email/${userEmail}`
        );

        if (response.status === 200 && response.data) {
          // ✅ Attendee exists, save ID and go to profile/dashboard
          localStorage.setItem("attendeeId", response.data._id);
          navigate("/profile");
        } else {
          navigate("/attendee-form");
        }
      } catch (err) {
        if (err.response?.status === 404) {
          // ❌ Attendee not found, redirect to form
          navigate("/attendee-form");
        } else {
          console.error("Error checking attendee:", err);
          // Optionally redirect to error page or show a toast
        }
      }
    };

    checkAttendeeStatus();
  }, [navigate]);

  return null; // Optional: spinner while checking
};

export default CheckAttendeeStatus;
