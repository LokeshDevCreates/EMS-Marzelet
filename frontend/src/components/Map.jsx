import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

const Map = () => {
  useEffect(() => {
    const initialCoordinates = [13.114080773683169, 80.1031811505735];
    const map = L.map("map").setView(initialCoordinates, 15);

    const tileLayer = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      }
    ).addTo(map);
     console.log(motion,tileLayer)
    const customIcon = L.divIcon({
      className: "custom-marker",
      html: '<div style="background: #FF5733; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    L.marker(initialCoordinates, { icon: customIcon })
      .addTo(map)
      .bindPopup("Marzelet Info Technology Pvt Ltd")
      .openPopup();

    L.circle(initialCoordinates, {
      color: "orange",
      fillColor: "#FF9D23",
      fillOpacity: 0.5,
      radius: 100,
    })
      .addTo(map)
      .bindPopup("Central Location");

    const recenterButton = L.control({ position: "bottomright" });
    recenterButton.onAdd = function () {
      const button = L.DomUtil.create("button", "recenter-button");
      button.innerHTML = "Recenter";
      button.style.backgroundColor = "#FF9D23";
      button.style.color = "white";
      button.style.border = "none";
      button.style.padding = "10px 12px";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      button.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
      button.style.transition =
        "background-color 0.3s ease, box-shadow 0.3s ease";

      button.onclick = () => {
        map.setView(initialCoordinates, 15);
      };

      button.onmouseover = () => {
        button.style.backgroundColor = "#FF7D00";
        button.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
      };

      button.onmouseout = () => {
        button.style.backgroundColor = "#FF9D23";
        button.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
      };

      return button;
    };
    recenterButton.addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="flex justify-center items-center p-4">
      <motion.section
        className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-red-500 mb-4 flex justify-center items-center">
          Find Us 
        </h2>
        <div
          id="map"
          className="w-full h-80 md:h-[400px] bg-gray-200 rounded-lg shadow-md"
        ></div>
      </motion.section>
      <style>
        {`
          .custom-marker {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
};

export default Map;
