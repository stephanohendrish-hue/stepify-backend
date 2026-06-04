import { useEffect, useState } from "react";
import axios from "axios";

export default function Ads({ darkMode }) {

  const [ads, setAds] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "2 Weeks",
  });

  const loadAds = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/ads"
      );

      setAds(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadAds();

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const createAd = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:5000/create_ad",
        form
      );

      alert("📢 Advertisement Created");

      setForm({
        title: "",
        description: "",
        duration: "2 Weeks",
      });

      loadAds();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="px-5 mt-8 pb-32">

      <h1 className="text-3xl font-bold">
        📢 Ads Manager
      </h1>

      <div
        className={`p-6 rounded-3xl mt-8 shadow-2xl ${
          darkMode
            ? "bg-[#101c3d]"
            : "bg-white text-black"
        }`}
      >

        <h2 className="text-2xl font-bold">
          Create Advertisement
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Advertisement Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mt-6 text-black"
        />

        <textarea
          name="description"
          placeholder="Advertisement Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mt-4 text-black"
        />

        <select
          name="duration"
          value={form.duration}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mt-4 text-black"
        >
          <option>2 Weeks</option>
          <option>1 Month</option>
          <option>3 Months</option>
          <option>6 Months</option>
        </select>

        <button
          onClick={createAd}
          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-700 p-4 rounded-2xl text-white font-bold"
        >
          CREATE AD 📢
        </button>

      </div>

      <div className="space-y-6 mt-8">

        {ads.map((ad) => (

          <div
            key={ad.id}
            className={`p-6 rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-[#101c3d]"
                : "bg-white text-black"
            }`}
          >

            <h2 className="text-2xl font-bold">
              📢 {ad.title}
            </h2>

            <p className="mt-3">
              {ad.description}
            </p>

            <p className="mt-3">
              ⏳ {ad.duration}
            </p>

            <p className="mt-3">
              ✅ {ad.status}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}