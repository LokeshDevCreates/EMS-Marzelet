import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>; // Show a loading state

  if (!user) return <Navigate to="/login" />; // Redirect to login if not logged in

  if (!allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" />; // Redirect if role not allowed

  return children;
};

export default ProtectedRoute;
