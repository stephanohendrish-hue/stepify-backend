import { Link } from "react-router-dom";

export default function TopBar() {

  return (

    <div className="flex justify-between items-center px-5 pt-5">

      <div>

        <h1 className="text-3xl font-bold text-cyan-400">
          STEPify
        </h1>

        <p className="text-sm opacity-70">
          CONNECT • CONTROL • MANAGE
        </p>

      </div>

      <div className="flex gap-3">

        <Link to="/notifications">
          <button className="bg-cyan-600 px-4 py-3 rounded-2xl">
            🔔
          </button>
        </Link>

        <Link to="/ads">
          <button className="bg-purple-600 px-4 py-3 rounded-2xl">
            📢
          </button>
        </Link>

        <Link to="/settings">
          <button className="bg-yellow-500 px-4 py-3 rounded-2xl">
            👑
          </button>
        </Link>

      </div>

    </div>

  );

}