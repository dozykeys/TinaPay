import { useContext, useState } from "react";
import { UserData } from "../../../context/userDataContext";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiLogoutCircleRFill } from "react-icons/ri";

import SignOutModal from "./SignOutModal";
import { useNavigate } from "react-router-dom";

export default function AuthNavbar() {
  const { userInfo, notiToggle, setNotiToggle } = useContext(UserData);
  const [signState, setSignState] = useState(false);

  const navigate = useNavigate();

  const signOut = async () => {
    setSignState(true);
    // try {
    //   await supabase.auth.signOut();
    //   toast.success("Logout successful");
    //   localStorage.removeItem("tinapay_user");
    //   Cookies.remove("tinapay_jwt");
    //   navigate("/auth/login");
    // } catch (error: any) {
    //   console.error("Error logging out:", error.message);
    //   toast.error("Failed to logout. Please try again.");
    // }
  };

  // console.log(user);
  return (
    <div className="w-full bg-white p-2 flex border justify-between items-center">
      {/* mobile */}
      <div className="flex md:hidden items-center gap-2">
        <div className="w-10 h-10 bg-[#5DAD19] rounded-full flex items-center justify-center">
          <h1 className=" text-white">
            {userInfo?.first_name.slice(0, 2).toUpperCase()}
          </h1>
        </div>
        <h1 className="flex flex-col text-xs text-[#4F4F4F]">
          Welcome 👋🏾
          <span className="text-[#5DAD19] font-bold">
            {userInfo?.first_name}
          </span>
        </h1>
      </div>

      <h1 className="hidden md:flex gap-1 text-sm text-[#4F4F4F] items-center">
        Welcome{" "}
        <span className="text-[#5DAD19] text-lg font-bold">
          {userInfo?.first_name}
        </span>
      </h1>

      <div className="flex gap-2 items-center px-4">
        <div className="hidden md:flex bg-[#F4F4F4] p-2 rounded-xl items-center gap-1">
          <div className="w-10 h-10 bg-[#5DAD19] rounded-full flex items-center justify-center">
            <h1 className=" text-white">
              {userInfo?.first_name.slice(0, 2).toUpperCase()}
            </h1>
          </div>
          <h1 className="text-xs font-medium">{userInfo?.tag}</h1>
        </div>

        {/* notification large screen */}
        <div className="flex-col hidden lg:flex">
          {/* dot */}
          <div className="w-2 h-2 bg-red-600 rounded-full ml-3 -mb-1"></div>
          {notiToggle ? (
            <IoNotificationsOutline
              onClick={() => setNotiToggle(!notiToggle)}
              size={25}
              className="text-red-500 cursor-pointer"
            />
          ) : (
            <IoNotificationsOutline
              onClick={() => setNotiToggle(!notiToggle)}
              size={25}
              className="cursor-pointer"
            />
          )}
        </div>

        {/* notification medium and mobile screen */}
        <div className="flex flex-col lg:hidden">
          {/* dot */}
          <div className="w-2 h-2 bg-red-600 rounded-full ml-3 -mb-1"></div>
          {notiToggle ? (
            <IoNotificationsOutline
              onClick={() => {
                setNotiToggle(!notiToggle);
                navigate("/dashboard");
              }}
              size={25}
              className="text-red-500 cursor-pointer"
            />
          ) : (
            <IoNotificationsOutline
              onClick={() => {
                setNotiToggle(!notiToggle);
                navigate("/notifications");
              }}
              size={25}
              className="cursor-pointer"
            />
          )}
        </div>

        {/* logout */}
        <div className="flex flex-col">
          <RiLogoutCircleRFill
            onClick={signOut}
            className="text-tinaColor cursor-pointer"
            size={25}
          />
        </div>
      </div>

      {signState && <SignOutModal setSignState={setSignState} />}
    </div>
  );
}
