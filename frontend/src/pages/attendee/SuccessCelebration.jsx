import React, { useEffect } from 'react';

const SuccessCelebration = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const curtain = document.createElement("div");
      curtain.className = "confetti";
      curtain.style.left = Math.random() * 100 + "vw";
      curtain.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
      curtain.style.animationDuration = Math.random() * 2 + 3 + "s";
      document.body.appendChild(curtain);

      setTimeout(() => {
        curtain.remove();
      }, 5000);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-50 to-green-100 text-green-800">
      <h1 className="text-4xl font-bold mb-4">🎉 Booking Confirmed! 🎊</h1>
    </div>
  );
};

export default SuccessCelebration;

// /* CSS */
// <style>
//   .confetti {
//     position: fixed;
//     top: 0;
//     width: 10px;
//     height: 20px;
//     background-color: red;
//     animation: fall linear forwards;
//     z-index: 9999;
//   }

//   @keyframes fall {
//     to {
//       transform: translateY(100vh) rotateZ(360deg);
//       opacity: 0;
//     }
//   }
// </style>
