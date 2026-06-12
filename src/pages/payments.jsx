import { useEffect, useState } from "react";
import axios from "axios";

export default function Payments({

  darkMode,
  text,

}) {

  const [payments, setPayments] =
    useState([]);

  const [form, setForm] =
    useState({

      network_name: "",
      phone_number: "",
      receiver_name: "",

    });

  /* LOAD PAYMENTS */

  const loadPayments =
    async () => {

      try {

        const response =
          await axios.get(

            "https://stepify-backend-lcjj.onrender.com/payments"

          );

        setPayments(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    loadPayments();

  }, []);

  /* HANDLE */

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

  /* SAVE */

  const savePayment =
    async () => {

      try {

        await axios.post(

          "https://stepify-backend-lcjj.onrender.com/save_payment",

          form

        );

        alert(
          "✅ Payment Saved"
        );

        setForm({

          network_name: "",
          phone_number: "",
          receiver_name: "",

        });

        loadPayments();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="px-5 mt-8 pb-32">

      <h1 className="text-3xl font-bold">

        {text.payments}

      </h1>

      {/* FORM */}

      <div
        className={`p-6 rounded-3xl mt-8 shadow-2xl ${
          darkMode
            ? "bg-[#101c3d]"
            : "bg-white text-black"
        }`}
      >

        <h2 className="text-2xl font-bold">

          {text.paymentMethods}

        </h2>

        <input
          type="text"
          name="network_name"
          placeholder="Payment Network"
          value={form.network_name}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mt-6 text-black"
        />

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mt-4 text-black"
        />

        <input
          type="text"
          name="receiver_name"
          placeholder="Receiver Name"
          value={form.receiver_name}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mt-4 text-black"
        />

        <button
          onClick={savePayment}
          className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-700 p-4 rounded-2xl text-white font-bold"
        >

          {text.savePayments}

        </button>

      </div>

      {/* PAYMENT LIST */}

      <div className="space-y-6 mt-8">

        {payments.map((pay) => (

          <div
            key={pay.id}
            className={`p-6 rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-[#101c3d]"
                : "bg-white text-black"
            }`}
          >

            <h2 className="text-2xl font-bold">

              💳 {pay.network_name}

            </h2>

            <p className="mt-3">

              📱 {pay.phone_number}

            </p>

            <p className="mt-3">

              👤 {pay.receiver_name}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}