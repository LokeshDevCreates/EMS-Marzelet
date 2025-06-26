import { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Mail, Phone, MapPin, Twitter, Youtube, Instagram } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Contact = () => {
  const form = useRef(null);
  console.log(motion)
  const sendEmail = (e) => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm(
          "service_3wuzbng",
          "template_0jiks7q",
          form.current,
          "MZUmGUqXRnYBE66DZ"
        )
        .then(() => {
          toast.success("Message sent successfully! We will contact you shortly.");
          form.current.reset();
        })
        .catch(() => {
          toast.error("Failed to send the message. Please try again.");
        });
    }
  };

  useEffect(() => {
    const initialCoordinates = [13.114080773683169, 80.1031811505735];
    const map = L.map("map").setView(initialCoordinates, 15);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      }
    ).addTo(map);

    const customIcon = L.divIcon({
      className: "custom-marker",
      html: '<div style="background: #00ABE4; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    L.marker(initialCoordinates, { icon: customIcon })
      .addTo(map)
      .bindPopup("Marzelet Info Technology Pvt Ltd")
      .openPopup();

    L.circle(initialCoordinates, {
      color: "#00ABE4",
      fillColor: "#E9F1FA",
      fillOpacity: 0.5,
      radius: 100,
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Navbar />
      <div className="min-h-screen flex flex-col bg-[#E9F1FA]">
        {/* Map and Info Section */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Map Section */}
          <motion.div
            className="relative w-full lg:w-2/3 h-[400px] lg:h-[635px]"
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div id="map" className="w-full h-full"></div>
          </motion.div>

          {/* Contact Info & Form Section */}
          <motion.div
            className="w-full lg:w-1/3 bg-[#00ABE4] text-white p-6 lg:p-10 flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            variants={animationVariants}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-2xl font-bold text-center lg:text-left">
                Contact Us
              </h2>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center">
                  <MapPin className="mr-3" /> 31, First floor, TNHB, Avadi,
                  Chennai-54, Tamil Nadu 600054
                </li>
                <li className="flex items-center">
                  <Phone className="mr-3" /> +91-9629997391
                </li>
                <li className="flex items-center">
                  <Mail className="mr-3" /> info@marzelet.info
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">
                Send Us a Message
              </h3>
              <motion.form
                ref={form}
                onSubmit={sendEmail}
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                variants={animationVariants}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <input
                  id="name"
                  type="text"
                  name="user_name"
                  className="w-full px-4 py-2 rounded-lg bg-white text-black"
                  placeholder="Your Name"
                  required
                />
                <input
                  id="email"
                  type="email"
                  name="user_email"
                  className="w-full px-4 py-2 rounded-lg bg-white text-black"
                  placeholder="Your Email"
                  required
                />
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-4 py-2 rounded-lg bg-white text-black"
                  placeholder="Your Message"
                  rows="3"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#E9F1FA] hover:bg-[#00ABE4] text-black py-2 rounded-lg"
                >
                  Send
                </button>
              </motion.form>
            </div>
            <motion.div
              className="flex justify-center lg:justify-start space-x-4 mt-8"
              initial="hidden"
              whileInView="visible"
              variants={animationVariants}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="hover:opacity-80" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube className="hover:opacity-80" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="hover:opacity-80" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Contact;
