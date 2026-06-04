import { useEffect, useState } from "react";
import axios from "axios";

export default function Requests({ darkMode }) {

  const [requests, setRequests] =
    useState([]);

  const loadRequests =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:5000/requests"
          );

        setRequests(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    loadRequests();

  }, []);

  const approveRequest =
    async (id) => {

      try {

        await axios.get(
          `http://127.0.0.1:5000/approve/${id}`
        );

        alert("✅ Approved");

        loadRequests();

      } catch (error) {

        console.log(error);

      }

    };

  const paymentRequest =
    async (id) => {

      try {

        await axios.get(
          `http://127.0.0.1:5000/confirm_payment/${id}`
        );

        alert(
          "💳 Payment Confirmed"
        );

        loadRequests();

      } catch (error) {

        console.log(error);

      }

    };

  const connectUser =
    async (id) => {

      try {

        await axios.get(
          `http://127.0.0.1:5000/connect_user/${id}`
        );

        alert(
          "🌐 User Connected"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="px-5 mt-8 pb-32">

      <h1 className="text-3xl font-bold">
        📩 WiFi Requests
      </h1>

      <div className="space-y-6 mt-8">

        {requests.map((request) => (

          <div
            key={request.id}
            className={`p-6 rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-[#101c3d]"
                : "bg-white text-black"
            }`}
          >

            <h2 className="text-2xl font-bold">
              📶 {request.user_name}
            </h2>

            <p className="mt-2">
              📱 {request.device_name}
            </p>

            <p className="mt-2 font-bold">
              {request.status}
            </p>

            <button
              onClick={() =>
                approveRequest(
                  request.id
                )
              }
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-700 p-4 rounded-2xl text-white font-bold"
            >
              APPROVE ✅
            </button>

            <button
              onClick={() =>
                paymentRequest(
                  request.id
                )
              }
              className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-700 p-4 rounded-2xl text-white font-bold"
            >
              PAYMENT 💳
            </button>

            <button
              onClick={() =>
                connectUser(
                  request.id
                )
              }
              className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-700 p-4 rounded-2xl text-white font-bold"
            >
              CONNECT 🌐
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}