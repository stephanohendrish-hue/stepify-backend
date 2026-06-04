import { Link } from "react-router-dom";

export default function BottomNav() {

  return (

    <div className="fixed bottom-0 left-0 w-full bg-[#020817] border-t border-cyan-700 flex justify-around items-center p-4 z-50">

      <Link to="/" className="text-center">

        <div className="text-2xl">🏠</div>

        <p className="text-xs text-white">

          Home

        </p>

      </Link>

      <Link
        to="/requests"
        className="text-center"
      >

        <div className="text-2xl">📩</div>

        <p className="text-xs text-white">

          Requests

        </p>

      </Link>

      <Link
        to="/users"
        className="text-center"
      >

        <div className="text-2xl">🌐</div>

        <p className="text-xs text-white">

          Users

        </p>

      </Link>

      <Link
        to="/voucher"
        className="text-center"
      >

        <div className="text-2xl">🎫</div>

        <p className="text-xs text-white">

          Voucher

        </p>

      </Link>

      <Link
  to="/family-users"
  className="text-center"
>

  <div className="text-2xl">
    👨‍👩‍👧‍👦
  </div>

  <p className="text-xs text-white">
    Family
  </p>

</Link>

<Link
  to="/settings"
  className="text-center"
>
      
      
      

        <div className="text-2xl">⚙️</div>

        <p className="text-xs text-white">

          Settings

        </p>

      </Link>

    </div>

  );
}