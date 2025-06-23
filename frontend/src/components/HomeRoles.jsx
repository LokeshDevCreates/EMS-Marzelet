import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";

const HomeRoles = () => {
  const { user } = useUser();
  console.log(motion)
  if (user && user.role === "Admin") {
    return (
      <motion.div
        className="flex items-center justify-center h-screen bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Welcome, Admin!</h1>
          <p className="text-lg text-gray-600 mt-4">
            Manage events, users, and system settings in the admin dashboard.
          </p>
          <Link to="/admin-dashboard">
            <motion.button
              className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Go to Admin Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.section
        className="py-16 bg-gradient-to-b from-gray-100 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800">Choose Your Role</h2>
            <p className="text-lg text-gray-600 mt-4">
              Whether you're organizing an event or attending one, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
            {/* Organizer Section */}
            <motion.div
              className="relative bg-white shadow-lg rounded-xl p-8 transition-transform hover:scale-105 hover:shadow-2xl h-[420px] max-w-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white p-4 rounded-full">
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v2a4 4 0 004 4h4a4 4 0 004-4v-2M6 13V7a4 4 0 014-4h4a4 4 0 014 4v6M6 13l-2 2m16-2l2 2M9 17h6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-purple-600 mb-6 mt-14">Organize Your Event</h3>
              <p className="text-gray-600 mb-8">
                Host and manage events with our powerful tools. Simplify registrations, scheduling, and tracking in one place.
              </p>
              {user && user.role === "Organizer" ? (
                <Link to="/organizer-dashboard">
                  <motion.button
                    className="mt-10 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Go to Dashboard
                  </motion.button>
                </Link>
              ) : (
                <Link to="/signup">
                  <motion.button
                    className="mt-10 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Get Started as Organizer
                  </motion.button>
                </Link>
              )}
            </motion.div>

            {/* Attendee Section */}
            <motion.div
              className="relative bg-white shadow-lg rounded-xl p-8 transition-transform hover:scale-105 hover:shadow-2xl h-[420px] max-w-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-4 rounded-full">
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-2.667 0-8 1.333-8 4v1h16v-1c0-2.667-5.333-4-8-4zm0 0V4m0 4v4m-6 8h12M6 18l2 2m10-2l-2 2"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-6 mt-14">Explore and Book Events</h3>
              <p className="text-gray-600 mb-8">
                Discover amazing events near you and book your spot with ease.
              </p>
              {user && user.role === "Attendee" ? (
                <Link to="/attendee-dashboard">
                  <motion.button
                    className="mt-12 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Go to Dashboard
                  </motion.button>
                </Link>
              ) : (
                <Link to="/signup">
                  <motion.button
                    className="mt-12 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Find Events
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default HomeRoles;
