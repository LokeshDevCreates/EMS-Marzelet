
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingId = location?.state?.bookingId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircle2 size={60} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for booking your seat. We've received your payment and confirmed your registration.
        </p>

        {bookingId ? (
          <div className="bg-gray-100 text-sm text-gray-700 rounded-md px-4 py-3 mb-6">
            <p><strong>Booking ID:</strong> {bookingId}</p>
            <p>Your booking details are now saved. Please check your email or bookings section.</p>
          </div>
        ) : (
          <p className="text-red-600 mb-6">Booking ID not found. Please check your bookings manually.</p>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
