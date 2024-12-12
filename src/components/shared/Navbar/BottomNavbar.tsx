import { GoHomeFill } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { useContext } from "react";
import { UserData } from "../../../context/userDataContext";

export default function BottomNavbar() {
  const { userInfo } = useContext(UserData);
  return (
    <div className="fixed bottom-0 z-50 w-full bg-white p-2 flex shadow-lg border-t justify-between items-center">
      {/* mobile */}

      <div className="w-full grid grid-cols-4 justify-between md:hidden items-center gap-2">
        <NavLink
          to={!userInfo?.user_id_fk ? "/auth/onboarding" : "/dashboard"}
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center font-semibold text-green text-xs"
              : "flex flex-col items-center font-light text-gray-400 text-xs"
          }
        >
          <GoHomeFill size={25} />
          <h1>Home</h1>
        </NavLink>

        <NavLink
          to={!userInfo?.user_id_fk ? "/auth/onboarding" : "/transactions"}
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center font-semibold text-green text-xs"
              : "flex flex-col items-center font-light text-gray-400 text-xs"
          }
        >
          <MdOutlineCurrencyExchange size={25} />
          <h1>Transactions</h1>
        </NavLink>

        <NavLink
          to={!userInfo?.user_id_fk ? "/auth/onboarding" : "/support"}
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center font-semibold text-green text-xs"
              : "flex flex-col items-center font-light text-gray-400 text-xs"
          }
        >
          <IoChatbubbleEllipsesOutline size={25} />
          <h1>Support</h1>
        </NavLink>

        <NavLink
          to={!userInfo?.user_id_fk ? "/auth/onboarding" : "/profile"}
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center font-semibold text-green text-xs"
              : "flex flex-col items-center font-light text-gray-400 text-xs"
          }
        >
          <FaRegUser size={25} />
          <h1>Profile</h1>
        </NavLink>
      </div>
    </div>
  );
}
