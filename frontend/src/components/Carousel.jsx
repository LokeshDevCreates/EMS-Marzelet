import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CustomCarousel = () => {
  const navigate = useNavigate();
  console.log(motion);
  const handleViewEvents = () => {
    navigate("/events-list");
  };

  const handleBookEvent = (eventId) => {
    navigate(`/login?redirect=/events/${eventId}`);
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 },
  };

  return (
    <motion.section
      className="min-h-screen relative"
      initial="initial"
      animate="animate"
    >
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={1500}
        className="h-full"
        renderArrowPrev={(clickHandler, hasPrev) =>
          hasPrev && (
            <motion.button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/70 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-300"
              onClick={clickHandler}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ❮
            </motion.button>
          )
        }
        renderArrowNext={(clickHandler, hasNext) =>
          hasNext && (
            <motion.button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/70 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-300"
              onClick={clickHandler}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ❯
            </motion.button>
          )
        }
      >
        {["event1", "event2", "event3"].map((eventId, index) => (
          <motion.div
            className="relative h-screen"
            key={index}
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <img
              src={`/images/${eventId}.jpg`}
              alt={`Event ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 flex flex-col items-center justify-center text-center px-4">
              <motion.p
                className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {index === 0
                  ? "Marriage and Wedding Events"
                  : index === 1
                  ? "Music Fest 2025"
                  : "Startup Pitching Event"}
              </motion.p>
              <div className="flex space-x-4">
                <motion.button
                  className="bg-white text-black px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-200 transition-all duration-300"
                  onClick={handleViewEvents}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  View All Events
                </motion.button>
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  onClick={() => handleBookEvent(eventId)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Book This Event
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </Carousel>
    </motion.section>
  );
};

export default CustomCarousel;
