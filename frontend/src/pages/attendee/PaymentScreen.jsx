import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});
  const navigate = useNavigate();

  const handlePaymentInput = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (
      (paymentMethod === "gpay" && paymentInfo.upi) ||
      (paymentMethod === "card" &&
        paymentInfo.cardNumber &&
        paymentInfo.cardName &&
        paymentInfo.expiry &&
        paymentInfo.cvv)
    ) {
      navigate("/success");
    } else {
      alert("Please complete payment details.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-orange-50 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Select a Payment Method</h2>
      <div className="flex justify-around mb-6">
        <button
          onClick={() => setPaymentMethod("gpay")}
          className="px-4 py-2 bg-blue-100 rounded-md hover:bg-blue-200 transition"
        >
          🟢 GPay
        </button>
        <button
          onClick={() => setPaymentMethod("card")}
          className="px-4 py-2 bg-blue-100 rounded-md hover:bg-blue-200 transition"
        >
          💳 Debit Card
        </button>
      </div>

      {paymentMethod === "gpay" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Enter GPay UPI or Mobile Number</h3>
          <input
            type="text"
            name="upi"
            placeholder="e.g. yourname@upi / 9876543210"
            onChange={handlePaymentInput}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {paymentMethod === "card" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Enter Card Details</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            onChange={handlePaymentInput}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <input
            type="text"
            name="cardName"
            placeholder="Cardholder Name"
            onChange={handlePaymentInput}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            onChange={handlePaymentInput}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            onChange={handlePaymentInput}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {paymentMethod && (
        <button
          className="w-full py-3 bg-green-500 text-white font-medium text-lg rounded-md hover:bg-green-600 transition"
          onClick={handleConfirm}
        >
          Confirm & Pay
        </button>
      )}
    </div>
  );
};

export default PaymentScreen;
