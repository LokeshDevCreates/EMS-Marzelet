import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  BookOpen,
  User,
  Menu,
  Users,
  Settings
} from "lucide-react";
import { useState } from "react";

const OrganizerSidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/organizer-dashboard" },
    { name: "Create Events", icon: <Calendar size={20} />, path: "/organizer-dashboard/manage-events" },
    { name: "View Bookings", icon: <BookOpen size={20} />, path: "/organizer-dashboard/view-bookings" },
    { name: "Events", icon: <Users size={20} />, path: "/organizer-dashboard/show-events" },
    { name: "Profile", icon: <User size={20} />, path: "/organizer-dashboard/profile" },
    { name: "Settings", icon: <Settings size={20} />, path: "/organizer-dashboard/settings" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-white text-gray-800 p-2 rounded-full shadow-lg border"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-10 top-0 left-0 h-full w-64 bg-white text-gray-800 shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-20 bg-[#E3F2FD] shadow-inner">
          <h1 className="text-xl font-bold text-[#1565C0]">Organizer Panel</h1>
        </div>

        {/* Navigation */}
        <nav className="p-6 overflow-y-auto">
          <ul>
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <li key={item.name} className="mb-4">
                  <NavLink
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#BBDEFB] text-[#0D47A1] font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full h-16 flex items-center justify-center bg-[#E3F2FD] text-sm text-gray-700">
          <p>© 2025 Organizer</p>
        </footer>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-0 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default OrganizerSidebar;
