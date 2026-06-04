import { useEffect, useState } from "react";
import axios from "axios";

export default function OwnerStatus() {

  const [owner, setOwner] =
    useState(null);

  useEffect(() => {

    loadOwner();

  }, []);

  const loadOwner =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:5000/owners"
          );

        if (
          response.data.length > 0
        ) {

          setOwner(
            response.data[0]
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="flex justify-center mt-3">

      <div className="bg-gradient-to-r from-green-500 to-emerald-700 px-6 py-3 rounded-full shadow-xl">

        {owner ? (

          <span>

            👑 {owner.owner_name}
            {" | "}
            📡 {owner.router_type}

          </span>

        ) : (

          <span>

            No Owner Registered

          </span>

        )}

      </div>

    </div>

  );

}