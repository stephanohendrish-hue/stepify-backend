import { useState } from "react";

export default function PaymentConfirm({ darkMode }) {

  const [status, setStatus] = useState("Pending");

  return (

    <div className="px-5 mt-8 pb-32">

      <h1 className="text-3xl font-bold">
        💳 Payment Confirmation
      </h1>

      <div
        className={`mt-6 p-6 rounded-3xl border shadow-2xl ${
          darkMode
            ? "bg-[#101c3d] border-green-700 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >

        <h2 className="text-2xl font-bold">
          STEPify Access Payment
        </h2>

        <p className="mt-4">
          Status:
          {" "}
          <span className="font-bold">
            {status}
          </span>
        </p>

        <div className="space-y-4 mt-6">

          <button
            onClick={() =>
              setStatus("Waiting Confirmation ⏳")
            }
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 p-4 rounded-2xl font-bold text-white"
          >
            PAY NOW 💳
          </button>

          <button
            onClick={() =>
              setStatus("Payment Successful ✅")
            }
            className="w-full bg-gradient-to-r from-green-500 to-emerald-700 p-4 rounded-2xl font-bold text-white"
          >
            CONFIRM PAYMENT ✅
          </button>

          <button
            onClick={() =>
              setStatus("Access Granted 🌐")
            }
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 p-4 rounded-2xl font-bold text-white"
          >
            CONNECT USER 🌐
          </button>

        </div>

      </div>

    </div>

  );
}