import { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications({

  darkMode,

}) {

  const [notifications, setNotifications] =
    useState([]);

  const loadNotifications =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:5000/notifications"
          );

        setNotifications(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    loadNotifications();

  }, []);

  return (

    <div className="px-5 mt-8 pb-32">

      <h1 className="text-3xl font-bold">

        🔔 Notifications

      </h1>

      <div className="space-y-6 mt-8">

        {notifications.map((note) => (

          <div
            key={note.id}
            className={`p-6 rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-[#101c3d]"
                : "bg-white text-black"
            }`}
          >

            <h2 className="text-xl font-bold">

              {note.message}

            </h2>

          </div>

        ))}

      </div>

    </div>

  );

}