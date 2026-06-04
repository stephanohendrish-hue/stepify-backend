export default function HotspotStatus({

  darkMode,

}) {

  const hotspotOnline = true;

  return (

    <div className="px-5 mt-6">

      <div
        className={`p-6 rounded-3xl shadow-2xl flex justify-between items-center ${
          darkMode
            ? "bg-[#101c3d]"
            : "bg-white text-black"
        }`}
      >

        <div>

          <h2 className="text-2xl font-bold">

            📡 STEPify Hotspot

          </h2>

          <p className="mt-2 opacity-80">

            Router Connection Status

          </p>

        </div>

        <div>

          {hotspotOnline ? (

            <div className="bg-green-500 px-5 py-3 rounded-2xl font-bold">

              ONLINE ✅

            </div>

          ) : (

            <div className="bg-red-500 px-5 py-3 rounded-2xl font-bold">

              OFFLINE ❌

            </div>

          )}

        </div>

      </div>

    </div>

  );

}