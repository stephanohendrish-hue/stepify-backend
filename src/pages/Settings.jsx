import { useState } from "react";
import axios from "axios";

export default function Settings({

  darkMode,
  setDarkMode,

  language,
  setLanguage,

  text,

}) {

  const [ownerName, setOwnerName] =
    useState("");

  const [wifiName, setWifiName] =
    useState("");

  const [wifiPassword, setWifiPassword] =
    useState("");

  const [routerType, setRouterType] =
    useState("Airtel Router");

  const [registered, setRegistered] =
    useState(false);

  const registerOwner = async () => {

    try {

      await axios.post(

        "http://127.0.0.1:5000/register_owner",

        {

          owner_name:
            ownerName,

          wifi_name:
            wifiName,

          wifi_password:
            wifiPassword,

          router_type:
            routerType,

        }

      );

      alert(
        "✅ WiFi Registered Successfully"
      );

      setRegistered(true);

      setOwnerName("");
      setWifiName("");
      setWifiPassword("");

    } catch (error) {

      console.log(error);

      alert(
        "❌ Registration Failed"
      );

    }

  };

  return (

    <div className="px-5 mt-8 pb-32">

      <h1 className="text-3xl font-bold">

        ⚙️ {text.settings}

      </h1>

      {/* LANGUAGE */}

      <div
        className={`p-6 rounded-3xl mt-8 shadow-2xl ${
          darkMode
            ? "bg-[#101c3d]"
            : "bg-white text-black"
        }`}
      >

        <h2 className="text-2xl font-bold">

          {text.language}

        </h2>

        <p className="mt-3 opacity-80">

          {text.languageDesc}

        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <button
            onClick={() =>
              setLanguage("EN")
            }
            className={`p-4 rounded-2xl font-bold ${
              language === "EN"
                ? "bg-gradient-to-r from-cyan-500 to-blue-700 text-white"
                : darkMode
                ? "bg-[#1b2b52]"
                : "bg-gray-200"
            }`}
          >

            {text.english}

          </button>

          <button
            onClick={() =>
              setLanguage("SW")
            }
            className={`p-4 rounded-2xl font-bold ${
              language === "SW"
                ? "bg-gradient-to-r from-green-500 to-emerald-700 text-white"
                : darkMode
                ? "bg-[#1b2b52]"
                : "bg-gray-200"
            }`}
          >

            {text.swahili}

          </button>

        </div>

      </div>

      {/* THEME */}

      <div
        className={`p-6 rounded-3xl mt-8 shadow-2xl ${
          darkMode
            ? "bg-[#101c3d]"
            : "bg-white text-black"
        }`}
      >

        <h2 className="text-2xl font-bold">

          {text.theme}

        </h2>

        <p className="mt-3 opacity-80">

          {text.themeDesc}

        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <button
            onClick={() =>
              setDarkMode(false)
            }
            className={`p-4 rounded-2xl font-bold ${
              !darkMode
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >

            {text.light}

          </button>

          <button
            onClick={() =>
              setDarkMode(true)
            }
            className={`p-4 rounded-2xl font-bold ${
              darkMode
                ? "bg-gradient-to-r from-cyan-500 to-blue-700 text-white"
                : "bg-gray-200 text-black"
            }`}
          >

            {text.dark}

          </button>

        </div>

      </div>

      {/* OWNER REGISTRATION */}

      <div
        className={`p-6 rounded-3xl mt-8 shadow-2xl ${
          darkMode
            ? "bg-[#101c3d]"
            : "bg-white text-black"
        }`}
      >

        <h2 className="text-2xl font-bold">

          👑 OWNER REGISTRATION

        </h2>

        <p className="mt-3 opacity-80">

          Register Your WiFi Router

        </p>

        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) =>
            setOwnerName(
              e.target.value
            )
          }
          className="w-full p-4 rounded-2xl mt-6 text-black"
        />

        <input
          type="text"
          placeholder="WiFi Name"
          value={wifiName}
          onChange={(e) =>
            setWifiName(
              e.target.value
            )
          }
          className="w-full p-4 rounded-2xl mt-4 text-black"
        />

        <input
          type="password"
          placeholder="WiFi Password"
          value={wifiPassword}
          onChange={(e) =>
            setWifiPassword(
              e.target.value
            )
          }
          className="w-full p-4 rounded-2xl mt-4 text-black"
        />

        <select
          value={routerType}
          onChange={(e) =>
            setRouterType(
              e.target.value
            )
          }
          className="w-full p-4 rounded-2xl mt-4 text-black"
        >

          <option>
            ISP / Telecom Router
          </option>

          <option>
            standard Home Router
          </option>

          <option>
            Business Router
          </option>

          <option>
            MikroTik Router
          </option>

          <option>
            OpenWRT Router
          </option>

          <option>
            Advanced Router
          </option>

        </select>

        <button
          onClick={registerOwner}
          className={`w-full mt-6 p-4 rounded-2xl text-white font-bold ${
            registered
              ? "bg-green-600"
              : "bg-gradient-to-r from-yellow-400 to-orange-500"
          }`}
        >

          {registered
            ? "✅ WIFI REGISTERED"
            : "REGISTER WIFI 🚀"}

        </button>

      </div>

    </div>

  );

}