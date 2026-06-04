import { useEffect, useState } from "react";

export default function Users({

  darkMode,
  text,

}) {

  const [users, setUsers] =
    useState([]);

  const loadUsers = async () => {

    try {

      const response =
        await fetch(
          "http://127.0.0.1:5000/connected_users"
        );

      const data =
        await response.json();

      setUsers(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadUsers();

  }, []);

  return (

    <div className="px-5 mt-8 pb-32">

      <h1 className="text-3xl font-bold">

        🌐 Connected Users

      </h1>

      <div className="space-y-6 mt-8">

        {users.map((user) => (

          <div
            key={user.id}
            className={`p-6 rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-[#101c3d]"
                : "bg-white text-black"
            }`}
          >

            <h2 className="text-2xl font-bold">

              👤 {user.user_name}

            </h2>

            <p className="mt-2">

              📱 {user.device_name}

            </p>

            <p className="mt-2">

              🎫 {user.voucher_name}

            </p>

            <p className="mt-2">

              🌐 {user.status}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}