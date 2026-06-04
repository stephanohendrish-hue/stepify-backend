import { useEffect, useState } from "react";
import axios from "axios";

export default function Voucher({

  darkMode,
  text,

}) {

  const [vouchers, setVouchers] = useState([]);

  /* LOAD */

  const loadVouchers = async () => {

    try {

      const response =
        await axios.get(

          "http://127.0.0.1:5000/vouchers"

        );

      setVouchers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadVouchers();

  }, []);

  /* FORM */

  const [form, setForm] = useState({

    category: "",
    voucher_name: "",
    price: "",
    time_limit: "",
    data_limit: "",

  });

  const handleChange = (e) => {

    setForm({

      ...form,
      [e.target.name]: e.target.value,

    });

  };

  /* SAVE */

  const saveVoucher = async () => {

    try {

      await axios.post(

        "http://127.0.0.1:5000/create_voucher",

        form

      );

      alert("✅ Voucher Saved");

      loadVouchers();

      setForm({

        category: "",
        voucher_name: "",
        price: "",
        time_limit: "",
        data_limit: "",

      });

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="px-5 mt-8 pb-32">

      <h1 className="text-3xl font-bold">

        🎫 Voucher System

      </h1>

      {/* FORM */}

      <div
        className={`p-6 rounded-3xl mt-8 shadow-2xl ${
          darkMode
            ? "bg-[#101c3d]"
            : "bg-white"
        }`}
      >

        <h2 className="text-2xl font-bold mb-6">

          CREATE VOUCHER 🎫

        </h2>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-4 text-black"
        >

          <option value="">
            Select Category
          </option>

          <option>
            Class 1
          </option>

          <option>
            Class 2
          </option>

          <option>
            Class 3
          </option>

          <option>
            Class 4
          </option>

          <option>
            Class 5
          </option>

          <option>
            Family
          </option>

        </select>

        <input
          type="text"
          name="voucher_name"
          placeholder="Voucher Name"
          value={form.voucher_name}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-4 text-black"
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-4 text-black"
        />

        <input
          type="text"
          name="time_limit"
          placeholder="Time Limit"
          value={form.time_limit}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-4 text-black"
        />

        <input
          type="text"
          name="data_limit"
          placeholder="Data Limit"
          value={form.data_limit}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-4 text-black"
        />

        <button
          onClick={saveVoucher}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 p-4 rounded-2xl text-white font-bold"
        >

          SAVE VOUCHER ✅

        </button>

      </div>

      {/* VOUCHERS */}

      <div className="space-y-6 mt-8">

        {vouchers.map((voucher) => (

          <div
            key={voucher.id}
            className={`p-6 rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-[#101c3d]"
                : "bg-white text-black"
            }`}
          >

            <h2 className="text-2xl font-bold">

              🎫 {voucher.category}

            </h2>

            <p className="mt-3">

              🏷️ {voucher.voucher_name}

            </p>

            <p className="mt-3">

              💳 {voucher.price}

            </p>

            <p className="mt-3">

              ⏰ {voucher.time_limit}

            </p>

            <p className="mt-3">

              📶 {voucher.data_limit}

            </p>

          </div>

        ))}

      </div>

    </div>

  );
}