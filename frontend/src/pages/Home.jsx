import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import CustomCarousel from "../components/Carousel";
import HomeRoles from "../components/HomeRoles";
import Footer from "../components/Footer";
import Reviews from "../components/Reviews";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Home = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  console.log(motion,logout)
  const handleBookNowClick = () => {
    setIsProcessing(true);

    if (!user) {
      navigate("/login");
    } else if (user.role === "Organizer" || user.role === "Attendee") {
      navigate("/events-list");
    } else {
      alert("You are not authorized to book events.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <motion.section
        className="min-h-[80vh] flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/images/bg.jpg')`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
        <motion.div
          className="relative z-10 text-center px-4 sm:px-6 md:px-10 max-w-2xl md:max-w-3xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 md:mb-6">
            Transform How You Manage Events
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8">
            Simplify the process of discovering, booking, and organizing events
            with our intuitive platform.
          </p>
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-medium shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            onClick={handleBookNowClick}
            disabled={isProcessing}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isProcessing ? "Processing..." : "Book Now"}
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Roles, Carousel, Reviews, Footer */}
      <HomeRoles />
      <CustomCarousel />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
