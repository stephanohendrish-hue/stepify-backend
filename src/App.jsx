import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./styles/index.css";

import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import OwnerStatus from "./components/OwnerStatus";
import DashboardStats from "./components/DashboardStats";
import HotspotStatus from "./components/HotspotStatus";

import Home from "./pages/Home";
import Requests from "./pages/Requests";
import Users from "./pages/Users";
import Voucher from "./pages/Voucher";
import Payments from "./pages/Payments";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Ads from "./pages/Ads";
import FamilyUsers from "./pages/FamilyUsers";

import translations from "./data/translations";

import logo from "./images/logo.png";

export default function App() {

  /* LANGUAGE */

  const [language, setLanguage] =
    useState("EN");

  /* DARK MODE */

  const [darkMode, setDarkMode] =
    useState(true);

  /* QR */

  const [showQR, setShowQR] =
    useState(false);

  const [selectedWifi, setSelectedWifi] =
    useState("");

  /* SPLASH SCREEN */

  const [loading, setLoading] =
    useState(true);

  /* NETWORKS */

  const [networks] = useState([

    {
      id: 1,
      name: "STEPify FAST WiFi",
      speed: "GOOD NETWORK ⚡",
    },

    {
      id: 2,
      name: "Campus Hotspot",
      speed: "NORMAL NETWORK 📶",
    },

  ]);

  /* SPLASH */

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 4000);

    return () => clearTimeout(timer);

  }, []);

  /* LOAD SETTINGS */

  useEffect(() => {

    const savedLanguage =
      localStorage.getItem(
        "stepify_language"
      );

    const savedDarkMode =
      localStorage.getItem(
        "stepify_darkmode"
      );

    if (savedLanguage) {

      setLanguage(savedLanguage);

    }

    if (savedDarkMode) {

      setDarkMode(
        savedDarkMode === "true"
      );

    }

  }, []);

  /* SAVE SETTINGS */

  useEffect(() => {

    localStorage.setItem(
      "stepify_language",
      language
    );

    localStorage.setItem(
      "stepify_darkmode",
      darkMode
    );

  }, [language, darkMode]);

  /* TRANSLATIONS */

  const text =
    translations[language];

  /* SPLASH SCREEN */

  if (loading) {

    return (

      <div className="h-screen flex flex-col justify-center items-center bg-black text-white">

        <img
          src={logo}
          alt="STEPify"
          className="w-40 h-40 animate-pulse"
        />

        <h1 className="text-5xl font-bold mt-8 text-cyan-400">

          STEPify

        </h1>

        <p className="mt-4 opacity-70">

          CONNECT • CONTROL • MANAGE

        </p>

      </div>

    );

  }

  return (

    <BrowserRouter>

      <div
        className={`min-h-screen pb-32 transition-all duration-500 ${
          darkMode

            ? "bg-gradient-to-b from-[#020617] via-[#07122b] to-black text-white"

            : "bg-gradient-to-b from-cyan-100 via-white to-blue-100 text-black"
        }`}
      >

        {/* TOP BAR */}

        <TopBar />

        {/* OWNER STATUS */}

        <OwnerStatus />

        {/* DASHBOARD */}

        <DashboardStats />

        {/* HOTSPOT STATUS */}

        <HotspotStatus
          darkMode={darkMode}
        />

        {/* QR SECTION */}

        {showQR && (

          <div className="px-5 mt-6">

            <div
              className={`p-6 rounded-3xl text-center shadow-2xl ${
                darkMode
                  ? "bg-[#101c3d]"
                  : "bg-white text-black"
              }`}
            >

              <h2 className="text-2xl font-bold">

                📷 WiFi QR Code

              </h2>

              <div className="bg-white p-6 rounded-3xl mt-6 inline-block">

                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${selectedWifi}`}
                  alt="QR CODE"
                  className="w-52 h-52"
                />

              </div>

              <p className="mt-5 font-bold">

                📶 {selectedWifi}

              </p>

              <button
                onClick={() =>
                  setShowQR(false)
                }
                className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-700 p-4 rounded-2xl text-white font-bold"
              >

                CLOSE ❌

              </button>

            </div>

          </div>

        )}

        {/* ROUTES */}

        <Routes>

          <Route
            path="/"
            element={
              <Home
                networks={networks}
                setShowQR={setShowQR}
                setSelectedWifi={setSelectedWifi}
                text={text}
              />
            }
          />

          <Route
            path="/requests"
            element={
              <Requests
                darkMode={darkMode}
                text={text}
              />
            }
          />

          <Route
            path="/users"
            element={
              <Users
                darkMode={darkMode}
                text={text}
              />
            }
          />

          <Route
            path="/voucher"
            element={
              <Voucher
                darkMode={darkMode}
                text={text}
              />
            }
          />

          <Route
            path="/payments"
            element={
              <Payments
                darkMode={darkMode}
                text={text}
              />
            }
          />

          <Route
            path="/notifications"
            element={
              <Notifications
                darkMode={darkMode}
                text={text}
              />
            }
          />

          <Route
            path="/settings"
            element={
              <Settings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                language={language}
                setLanguage={setLanguage}
                text={text}
              />
            }
          />

          <Route
            path="/ads"
            element={
              <Ads
                darkMode={darkMode}
                text={text}
              />
            }
          />

          <Route
  path="/family-users"
  element={
    <FamilyUsers
      darkMode={darkMode}
    />
  }
/>
        </Routes>

        {/* BOTTOM NAVIGATION */}

        <BottomNav />

      </div>

    </BrowserRouter>

  );

}