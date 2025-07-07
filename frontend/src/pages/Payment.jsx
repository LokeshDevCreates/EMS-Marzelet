import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Calendar, Users, CreditCard } from "lucide-react";
import { loadRazorpay } from "../utils/loadRazorpay";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.bookingDetails;

  useEffect(() => {
    if (!booking) navigate('/');
  }, [booking, navigate]);

  const handlePayNow = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      const orderRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/create-order`, {
        amount: booking.seats * booking.price * 100,
        receipt: booking._id,
        currency: "INR",
      });

      const options = {
        key: "rzp_test_Ep3C7qPI7QOV9g",
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: "Event Booking",
        description: booking.eventName,
        order_id: orderRes.data.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/verify`, {
              ...response,
              bookingId: booking._id,
              eventId: booking.eventId
            });

            if (verifyRes.data.status === "ok") {
              toast.success("Payment successful!");
              navigate("/success", {
                state: {
                  ...booking,
                  paymentId: response.razorpay_payment_id,
                },
              });
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            toast.error("Verification request failed");
          }
        },
        prefill: {
          name: booking.userName,
          email: booking.userEmail,
          contact: booking.userPhone,
        },
        theme: { color: "#00ABE4" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate payment.");
    }
  };

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#00ABE4] mb-4">Secure Payment</h2>
        <p className="text-gray-600 text-center mb-6">
          Review your booking details and complete the payment.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Calendar className="text-[#00ABE4]" />
            <p className="text-lg font-medium text-gray-700">
              <strong>Event:</strong> {booking.eventName}
            </p>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <Users className="text-[#00ABE4]" />
            <p className="text-lg font-medium text-gray-700">
              <strong>Seats:</strong> {booking.seats}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <CreditCard className="text-[#00ABE4]" />
            <p className="text-lg font-medium text-gray-700">
              <strong>Total:</strong> ₹{booking.price * booking.seats}
            </p>
          </div>
        </div>

        <button
          onClick={handlePayNow}
          className="w-full bg-[#00ABE4] text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-[#009bd0] transition-colors"
        >
          Pay ₹{booking.price * booking.seats}
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Payment;
