import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, Users, Bell, Settings, Menu, LayoutDashboard } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin-dashboard" },
    { name: "Events", icon: <Calendar size={20} />, path: "/admin-dashboard/events" },
    { name: "Organizers", icon: <Users size={20} />, path: "/admin-dashboard/organizers" },
    {
      name: "Notifications",
      icon: <Bell size={20} />,
      path: "/admin-dashboard/notifications",
    },
    { name: "Settings", icon: <Settings size={20} />, path: "/admin-dashboard/settings" },
  ];

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-gray-800 text-gray-200 p-2 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-10 top-0 left-0 h-full w-64 bg-gray-800 text-gray-200 shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-center h-24 bg-gray-900 shadow">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>
        <nav className="flex-grow p-6 overflow-y-auto">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-5">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg ${
                      isActive && (item.path === "/admin-dashboard" ? pathname === "/admin-dashboard" : true)
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <footer className="flex items-center justify-center h-16 mt-20 bg-gray-900 text-gray-400">
          <p>© 2025 All rights reserved.</p>
        </footer>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
