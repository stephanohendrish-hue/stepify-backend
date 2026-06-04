import axios from "axios";

export default function Home({

  networks,
  setShowQR,
  setSelectedWifi,
  text,

}) {

  /* REQUEST */

  const requestAccess = async (

    wifiName

  ) => {

    try {

      await axios.post(

        "http://127.0.0.1:5000/request_access",

        {

          user_name: "STEPify User",
          device_name: "Android Phone",

        }

      );

      alert(
        `📩 Request Sent to ${wifiName}`
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="px-5 mt-8 pb-32">

      <h1 className="text-3xl font-bold">

        {text.home}

      </h1>

      <div className="space-y-6 mt-8">

        {networks.map((wifi) => (

          <div
            key={wifi.id}
            className="bg-gradient-to-r from-cyan-600 to-blue-900 p-6 rounded-3xl shadow-2xl"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold">

                  📶 {wifi.name}

                </h2>

                <p className="mt-3">

                  🚀 {wifi.speed}

                </p>

              </div>

              <div className="text-5xl">

                📡

              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <button
                onClick={() => {

                  setShowQR(true);

                  setSelectedWifi(

                   `WIFI:${wifi.name}`

                  );                              

                }}
                className="bg-white text-black p-4 rounded-2xl font-bold"
              >

                QR CODE 📷

              </button>

              <button
                onClick={() =>
                  requestAccess(
                    wifi.name
                  )
                }
                className="bg-gradient-to-r from-green-500 to-emerald-700 p-4 rounded-2xl text-white font-bold"
              >

                {text.join}

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}