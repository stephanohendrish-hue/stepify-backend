import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardStats() {

  const [stats, setStats] = useState({

    users: 0,
    vouchers: 0,
    requests: 0,
    payments: 0,

  });

  const loadStats = async () => {

    try {

      const users =
        await axios.get(
          "http://127.0.0.1:5000/connected_users"
        );

      const vouchers =
        await axios.get(
          "http://127.0.0.1:5000/vouchers"
        );

      const requests =
        await axios.get(
          "http://127.0.0.1:5000/requests"
        );

      const payments =
        await axios.get(
          "http://127.0.0.1:5000/payments"
        );

      setStats({

        users:
          users.data.length,

        vouchers:
          vouchers.data.length,

        requests:
          requests.data.length,

        payments:
          payments.data.length,

      });

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadStats();

  }, []);

  return (

    <div className="grid grid-cols-2 gap-4 px-5 mt-6">

      <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-5 rounded-3xl">

        <h2 className="text-3xl font-bold">
          {stats.users}
        </h2>

        <p>🌐 Connected Users</p>

      </div>

      <div className="bg-gradient-to-r from-pink-500 to-purple-700 p-5 rounded-3xl">

        <h2 className="text-3xl font-bold">
          {stats.vouchers}
        </h2>

        <p>🎫 Vouchers</p>

      </div>

      <div className="bg-gradient-to-r from-green-500 to-emerald-700 p-5 rounded-3xl">

        <h2 className="text-3xl font-bold">
          {stats.requests}
        </h2>

        <p>📩 Requests</p>

      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-700 p-5 rounded-3xl">

        <h2 className="text-3xl font-bold">
          {stats.payments}
        </h2>

        <p>💳 Payments</p>

      </div>

    </div>

  );

}