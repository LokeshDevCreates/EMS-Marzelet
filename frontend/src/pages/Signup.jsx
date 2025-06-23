import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext.jsx"; 
import Navbar from "../components/Navbar.jsx";// Adjust the path if needed
import Footer from "../components/Footer.jsx"; // Adjust the path if needed
const Signup = () => {
  const navigate = useNavigate();

  // Access auth context
  const { authState, setAuthState } = useContext(AuthContext);
  console.log(authState)
  // State variables
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Google Signup Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleSignupData, setGoogleSignupData] = useState({
    displayName: "",
    password: "",
    role: "",
  });

  // Helper to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleInputChange = (e) => {
    const { name, value } = e.target;
    setGoogleSignupData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to navigate based on role
  const navigateByRole = (role) => {
    console.log("Navigating by role:", role);
    if (role === "Organizer") {
      navigate("/organizer-dashboard");
    } else if (role === "Attendee") {
      navigate("/attendee-dashboard");
    } else {
      toast.error("Unknown role. Please contact support.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, displayName, password, role } = formData;

    if (!email || !password || !displayName || !role) {
      toast.warning("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName });

      // Send email verification
      await sendEmailVerification(res.user);
      toast.info("A verification email has been sent. Please verify your email.");

      const token = await res.user.getIdToken();

      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: displayName, email, role, password }),
      });

      if (response.ok) {
        toast.success("Signup successful!");
        setAuthState({
          email,
          displayName,
          role,
          isAuthenticated: true,
        });
        navigate("/verify-email");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to save user data.");
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const googleEmail = result.user.email;
      const token = await result.user.getIdToken();

      const { displayName, password, role } = googleSignupData;
      if (!displayName || !password || !role) {
        toast.warning("Please complete all fields for Google Signup.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: displayName,
          email: googleEmail,
          role,
          password,
        }),
      });

      if (response.ok) {
        toast.success("Signup with Google successful!");
        const userData = await response.json();

        setAuthState({
          email: googleEmail,
          displayName,
          role: userData.role,
          isAuthenticated: true,
        });

        navigateByRole(userData.role);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to save Google user data.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Google signup failed. Please try again.");
    } finally {
      setShowGoogleModal(false);
      setGoogleSignupData({ displayName: "", password: "", role: "" });
    }
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        toast.error("This email is already registered.");
        setTimeout(() => navigate("/login"), 1500);
        break;
      case "auth/invalid-email":
        toast.error("Please enter a valid email.");
        break;
      case "auth/weak-password":
        toast.error("Password should be at least 6 characters.");
        break;
      default:
        console.error(error.message);
        toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Create an Account
        </h2>

        <input
          className="border p-3 w-full mb-4 rounded"
          type="text"
          name="displayName"
          placeholder="User Name"
          value={formData.displayName}
          onChange={handleInputChange}
        />
        <input
          className="border p-3 w-full mb-4 rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className="relative mb-4">
          <input
            className="border p-3 w-full rounded"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <select
          className="border p-3 w-full mb-4 rounded"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option value="">Select Role</option>
          <option value="Attendee">Attendee</option>
          <option value="Organizer">Organizer</option>
        </select>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-4"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="flex items-center mb-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-3 text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <button
          type="button"
          className="bg-red-500 text-white py-2 px-4 rounded w-full"
          onClick={() => setShowGoogleModal(true)}
        >
          Sign Up with Google
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </form>

      {showGoogleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4 text-center text-blue-600">
              Complete Google Signup
            </h3>
            <input
              type="text"
              name="displayName"
              placeholder="User Name"
              className="border p-3 w-full mb-4 rounded"
              value={googleSignupData.displayName}
              onChange={handleGoogleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-3 w-full mb-4 rounded"
              value={googleSignupData.password}
              onChange={handleGoogleInputChange}
            />
            <select
              name="role"
              className="border p-3 w-full mb-4 rounded"
              value={googleSignupData.role}
              onChange={handleGoogleInputChange}
            >
              <option value="">Select Role</option>
              <option value="Attendee">Attendee</option>
              <option value="Organizer">Organizer</option>
            </select>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded w-full mb-2"
              onClick={handleGoogleSignup}
            >
              Complete Signup
            </button>
            <button
              className="w-full py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() => setShowGoogleModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default Signup;
