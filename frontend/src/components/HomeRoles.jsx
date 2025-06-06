
import { Link } from "react-router-dom";
const HomeRoles = () => {
  return (
    <>
         {/* Event Organizer and Attendee Section */}
        <section className="py-16 bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-800">
                Choose Your Role
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Whether you're organizing an event or attending one, we've got you covered.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
              {/* Organizer Section */}
              <div className="relative bg-white shadow-lg rounded-xl p-8 transition-transform hover:scale-105 hover:shadow-2xl h-[420px] max-w-md">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white p-4 rounded-full">
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
                <h3 className="text-2xl font-bold text-purple-600 mb-6 mt-14">
                  Organize Your Event
                </h3>
                <p className="text-gray-600 mb-8">
                  Host and manage events with our powerful tools. Simplify registrations, scheduling, and tracking in one place.
                </p>
                <Link to="/login">
                  <button className="mt-10 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300">
                    Get Started as Organizer
                  </button>
                </Link>
              </div>

              {/* Attendee Section */}
              <div className="relative bg-white shadow-lg rounded-xl p-8 transition-transform hover:scale-105 hover:shadow-2xl h-[420px] max-w-md">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-4 rounded-full">
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
                <h3 className="text-2xl font-bold text-blue-600 mb-6 mt-14">
                  Explore and Book Events
                </h3>
                <p className="text-gray-600 mb-8">
                  Discover amazing events near you and book your spot with ease.
                </p>
                <Link to="/login">
                  <button className="mt-12 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                    Find Events
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default HomeRoles