import { Link, NavLink } from "react-router-dom";
// import { IoMoon, IoSunnySharp } from "react-icons/io5";
//
import { authNavLinks } from "../../../constants";
import logo from "../../../assets/home/logo.svg";
import googlePlay from "../../../assets/home/google_play.svg";
import app_store from "../../../assets/home/app_store.svg";
import { useContext } from "react";
import { UserData } from "../../../context/userDataContext";

export default function Sidebar() {
  const { userInfo } = useContext(UserData);

  return (
    <div className="flex w-4/5 min-h-screen mx-auto text-[#B4B4B5] gap-10 my-10 flex-col">
      {/* logo */}
      <Link to={"/dashboard"}>
        <img src={logo} alt="logo" className="w-40 cursor-pointer" />
      </Link>

      {/* navlinks */}
      <div className="grid grid-cols-1 gap-3">
        {authNavLinks.map((item, index) => (
          <NavLink
            to={!userInfo?.user_id_fk ? "/auth/onboarding" : `${item.path}`}
            className={({ isActive }) =>
              isActive
                ? "bg-[#3F622E] p-1 rounded-lg text-white flex gap-2 text-lg items-center"
                : "flex gap-2  p-1 text-lg items-center"
            }
            key={index}
          >
            {item.icon({ size: 30 })}
            <h1>{item.title}</h1>
          </NavLink>
        ))}
      </div>

      {/* theme switcher */}
      {/* <div className="flex items-center justify-between">
        <h1 className="text-lg">Theme</h1>

        <div className="flex bg-[#3F622E] text-[#e3d189] gap-3 rounded-full p-1"> */}
      {/* icon */}
      {/* <div className="p-1 bg-white rounded-full">
            <IoSunnySharp size={20} />
          </div>
          <div className="p-1">
            <IoMoon size={20} />
          </div>
        </div>
      </div> */}

      {/* appstores */}
      <div className="w-[95%] mx-auto flex flex-col justify-center gap-5 items-center text-center">
        <div className="w-full mx-auto flex flex-col items-center  text-white bg-[#161503] rounded-lg py-10 px-5">
          <h2 className="text-lg font-extrabold mb-5 leading-tight text-start ">
            Download Our Mobile App
          </h2>
          <div className="w-full flex justify-center gap-2 mt-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.tinapay&pcampaignid=web_share"
              className="cursor-pointer"
              target="blank_"
            >
              <img
                src={googlePlay}
                width={80}
                className="responsive-img"
                alt=""
              />
            </a> 
            <a
              href="https://apps.apple.com/us/app/tinapay/id6473535794"
              className="cursor-pointer"
              target="blank_"
            >
              <img
                src={app_store}
                width={80}
                className="responsive-img"
                alt=""
              />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}
