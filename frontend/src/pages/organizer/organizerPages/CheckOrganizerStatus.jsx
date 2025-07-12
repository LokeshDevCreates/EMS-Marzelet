import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckOrganizerStatus = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkOrganizerStatus = async () => {
      const userEmail = localStorage.getItem("organizerEmail");

      if (!userEmail) {
        navigate("/login"); // 🔁 No organizer email = not logged in
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/organizers/from-user/${userEmail}`
        );

        if (response.data.exists) {
          navigate("/organizer-dashboard");
        } else {
          navigate("/organizer-form");
        }
      } catch (err) {
        if (err.response?.status === 404) {
          // ✅ Organizer does not exist yet
          navigate("/organizer-form");
        } else {
          console.error("Error checking organizer:", err);
          // Optionally redirect to error page or show toast
        }
      }
    };

    checkOrganizerStatus();
  }, [navigate]);

  return null; // Optional: return a loading spinner if UX is needed
};

export default CheckOrganizerStatus;
