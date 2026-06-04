import { useEffect, useState } from "react";
import axios from "axios";

export default function FamilyUsers({ darkMode }) {

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/family_users"
      );

      setUsers(response.data);

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
        👨‍👩‍👧‍👦 Family Users
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
              🔓 {user.access_type}
            </p>

            <p className="mt-2">
              ⏰ {user.time_limit}
            </p>

            <p className="mt-2">
              📶 {user.data_limit}
            </p>

            <p className="mt-2">
              ✅ {user.status}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}