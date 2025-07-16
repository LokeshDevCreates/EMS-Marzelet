import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"
const PrivacyPolicy = () => {
    console.log(motion)
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col items-center px-4 md:px-10 lg:px-20 py-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This Privacy Policy outlines how we collect, use, and safeguard your personal data when you use our Event Booking Management System (EBMS).
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div
          className="max-w-4xl space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Section: What We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Personal details: Name, email, contact number, profile image</li>
              <li>Event data: Events you create or attend</li>
              <li>Payment information: Secured via Razorpay</li>
              <li>Usage data: Device, browser, IP address, location</li>
            </ul>
          </section>

          {/* Section: How We Use */}
          <section>
            <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To register users and manage event participation</li>
              <li>To facilitate secure payments</li>
              <li>To communicate booking status and updates</li>
              <li>To improve our platform through analytics</li>
            </ul>
          </section>

          {/* Section: Sharing Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-3">3. Sharing Your Information</h2>
            <p className="text-gray-700">
              We only share necessary data with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>Payment gateways (e.g., Razorpay)</li>
              <li>Event organizers (for bookings)</li>
              <li>Legal authorities (if required by law)</li>
            </ul>
          </section>

          {/* Section: Data Security */}
          <section>
            <h2 className="text-2xl font-bold mb-3">4. Data Security</h2>
            <p className="text-gray-700">
              We implement advanced security protocols to protect your data. All payment data is encrypted and handled by secure gateways.
            </p>
          </section>

          {/* Section: Cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-3">5. Cookies and Tracking</h2>
            <p className="text-gray-700">
              EBMS uses cookies to improve user experience, analyze traffic, and manage session data. You may disable cookies via browser settings.
            </p>
          </section>

          {/* Section: User Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-3">6. Your Rights</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You can view, update, or delete your personal data</li>
              <li>You can opt out of promotional emails</li>
            </ul>
          </section>

          {/* Section: Changes */}
          <section>
            <h2 className="text-2xl font-bold mb-3">7. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. All changes will be posted on this page with the latest update date.
            </p>
          </section>

          {/* Section: Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-3">8. Contact Us</h2>
            <p className="text-gray-700">
              For questions or concerns regarding your data, contact us at{" "}
              <Link
                      to="/contact"
                      className="hover:text-[#E9F1FA] transition-colors text-blue-500"
                    >
                      Evento
             </Link>
            </p>
          </section>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
