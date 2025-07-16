import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Terms = () => {
    console.log(motion)
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col items-center px-4 md:px-10 lg:px-20 py-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These Terms of Service govern your use of the Event Booking Management System (EBMS). Please read them carefully.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="max-w-4xl space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Section: Acceptance */}
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing or using EBMS, you agree to be bound by these Terms. If you do not agree, you must not use our services.
            </p>
          </section>

          {/* Section: User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold mb-3">2. User Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You must provide accurate and complete registration information.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You agree not to misuse the platform or engage in unlawful activity.</li>
            </ul>
          </section>

          {/* Section: Event Creation */}
          <section>
            <h2 className="text-2xl font-bold mb-3">3. Event Creation and Bookings</h2>
            <p className="text-gray-700">
              Event organizers are solely responsible for the accuracy of event details. Attendees are responsible for verifying event legitimacy before booking.
            </p>
          </section>

          {/* Section: Payments */}
          <section>
            <h2 className="text-2xl font-bold mb-3">4. Payments and Refunds</h2>
            <p className="text-gray-700">
              All payments are securely processed via Razorpay. Refunds are handled according to the organizer’s refund policy. EBMS is not liable for disputes between organizers and attendees.
            </p>
          </section>

          {/* Section: Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-3">5. Intellectual Property</h2>
            <p className="text-gray-700">
              All content and trademarks on EBMS are the property of their respective owners. You may not copy, modify, or distribute content without authorization.
            </p>
          </section>

          {/* Section: Termination */}
          <section>
            <h2 className="text-2xl font-bold mb-3">6. Termination</h2>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate your access to EBMS if you violate these Terms or misuse the platform.
            </p>
          </section>

          {/* Section: Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-3">7. Limitation of Liability</h2>
            <p className="text-gray-700">
              EBMS is not liable for any indirect, incidental, or consequential damages resulting from your use of the platform.
            </p>
          </section>

          {/* Section: Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-3">8. Changes to Terms</h2>
            <p className="text-gray-700">
              These Terms may be updated from time to time. Continued use of the platform after changes implies acceptance of the updated Terms.
            </p>
          </section>

          {/* Section: Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-3">9. Contact Us</h2>
            <p className="text-gray-700">
              For any questions regarding these Terms, please contact us at{" "}
              <Link
                to="/contact"
                className="text-blue-500 hover:text-[#E9F1FA] transition-colors"
              >
                Evento
              </Link>
              .
            </p>
          </section>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
