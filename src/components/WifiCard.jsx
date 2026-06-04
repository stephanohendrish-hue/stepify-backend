import { Signal } from "lucide-react";

export default function WifiCard({
  network,
  setShowQR,
  setSelectedWifi,
  text,
}) {

  return (

    <div className="bg-[#101c3d] rounded-3xl p-5 border border-blue-900">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold">
            {network.name}
          </h2>

          <p className="mt-2 text-gray-400">
            {network.speed}
          </p>

        </div>

        <Signal className="text-cyan-400" />

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <button
          disabled={!network.internet}
          className={`p-3 rounded-2xl font-bold ${
            network.internet
              ? "bg-gradient-to-r from-cyan-500 to-blue-700"
              : "bg-gray-500"
          }`}
        >
          {network.internet
            ? text.join
            : text.noAccess}
        </button>

        <button
          onClick={() => {
            setSelectedWifi(network.name);
            setShowQR(true);
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-700 p-3 rounded-2xl font-bold"
        >
          QR CODE
        </button>

      </div>

    </div>

  );
}