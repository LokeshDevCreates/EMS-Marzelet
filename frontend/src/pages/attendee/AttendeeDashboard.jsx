import React from "react";
import { useNavigate } from "react-router-dom";

const events = [
  {
    title: "Royal Wedding Expo",
    description: "Plan your dream marriage ceremony.",
    image: "https://i.ytimg.com/vi/EpZY2bvZ_aY/maxresdefault.jpg",
  },
  {
    title: "National Football Final",
    description: "Cheer for your favourite team!",
    image: "https://images.moneycontrol.com/static-mcnews/2022/12/AP22352513324776.jpg",
  },
  {
    title: "Classical Dance Night",
    description: "Celebrate cultural heritage & art.",
    image: "https://tse1.mm.bing.net/th/id/OIP.yzbKPjvD2RMuDhaiwUNrDQHaEo?rs=1&pid=ImgDetMain.jpg",
  },
  {
    title: "Harvest Feast Carnival",
    description: "Enjoy mouth-watering food festivals.",
    image: "https://tse3.mm.bing.net/th/id/OIP.qnJNQ_6r6FOM9HO-qSsajwHaEc?rs=1&pid=ImgDetMain.jpg",
  },
  {
    title: "Tech Innovators Summit",
    description: "Experience trending tech talks.",
    image: "https://tse1.mm.bing.net/th/id/OIP.XZIwLainEPgi__0xPE3b9gHaEK?rs=1&pid=ImgDetMain.jpg",
  },
  {
    title: "High-Fashion Runway",
    description: "Witness the latest fashion trends.",
    image: "https://tse3.mm.bing.net/th/id/OIP.Y8TTy5P-My3CL-WtQKSluQHaEK?rs=1&pid=ImgDetMain",
  },
  {
    title: "Rock Music Concert",
    description: "Feel the vibe of live bands!",
    image: "https://tse4.mm.bing.net/th/id/OIP.SN59DWznaat8wgqrSrYFSwHaE8?rs=1&pid=ImgDetMain",
  },
  {
    title: "Corporate Leadership Forum",
    description: "Network with industry leaders.",
    image: "https://tse3.mm.bing.net/th/id/OIP.oEe7vDs-1ZV3qb7pimmU_gHaE4?w=1282&h=846&rs=1&pid=ImgDetMain",
  },
  {
    title: "City Marathon 2025",
    description: "Push your limits on the track.",
    image: "https://tse4.mm.bing.net/th/id/OIP.g0v7ZQPyDiiCVenTqfl9rQHaE8?rs=1&pid=ImgDetMainL",
  },
  {
    title: "Outdoor Movie Night",
    description: "Enjoy cinema under the stars.",
    image: "https://tse2.mm.bing.net/th/id/OIP.7q4qJaIkoE9iUjhTBejl6wHaHm?rs=1&pid=ImgDetMain",
  },
];

export default function UserEventBooking() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 py-8">
      <header className="relative bg-cover bg-center text-center text-white py-20 px-8" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="bg-black bg-opacity-50 p-8 rounded-md">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Event Booking Platform</h1>
          <p className="text-lg">Find the perfect event for any occasion</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 mt-10">
        {events.map((evt, idx) => (
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:-translate-y-2"
            key={idx}
          >
            <img
              src={evt.image}
              alt={evt.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold mb-2">{evt.title}</h3>
              <p className="text-gray-600 mb-4">{evt.description}</p>
              <button
                onClick={() => navigate("/booking")}
                className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
