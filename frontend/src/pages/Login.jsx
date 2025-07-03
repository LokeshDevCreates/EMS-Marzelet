import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const userData = await response.json();
      console.log("User data received:", userData);

      const { user } = userData;

      if (!user || !user.role || !user.email) {
        throw new Error("User data is incomplete.");
      }

      login(user); // ✅ This keeps the _id, email, name, role intact
      if (user.role === "Organizer") {
        localStorage.setItem("organizerEmail", user.email); // ✅ Use server-returned email
        navigate("/organizer-check"); // ✅ This will route to /organizer-form or /organizer-dashboard
      } else if (user.role === "Attendee") {
        navigate("/");
        window.location.reload();
        toast.success("You have been Logged in Successfully")
      } else if (user.role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        throw new Error("Unknown user role.");
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast.warning("Please enter your email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send reset email.");
      }

      toast.success("Password reset email sent. Check your inbox!");
      setShowResetModal(false);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast.error(error.message || "Failed to send reset email.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <ToastContainer position="top-center" autoClose={2000} />

        <form
          onSubmit={handleLogin}
          className="bg-white p-6 sm:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">
            Login
          </h2>

          <input
            className="border p-3 w-full mb-4 rounded text-sm sm:text-base"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="relative mb-4">
            <input
              className="border p-3 w-full pr-20 rounded text-sm sm:text-base"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm sm:text-base text-blue-600 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full disabled:opacity-50 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="text-cyan-600 font-medium hover:underline text-sm sm:text-base"
            >
              Forgot Password?
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-cyan-600 font-medium hover:underline text-sm sm:text-base"
            >
              Sign Up
            </button>
          </div>
        </form>

        {showResetModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-600">
                Reset Password
              </h3>
              <input
                className="border p-3 w-full mb-4 rounded text-sm sm:text-base"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setResetEmail(e.target.value)}
                value={resetEmail}
              />
              <div className="flex justify-between">
                <button
                  onClick={handlePasswordReset}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-sm sm:text-base"
                >
                  Send Reset Email
                </button>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
