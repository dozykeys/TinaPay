import { NavLink } from "react-router-dom";
import emailIcon from "../../../assets/auth/checkemail.svg";

export default function EmailConfirm() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-2">
      <img src={emailIcon} alt="" />

      <h1 className="text-xl text-center font-bold">Email Confirmed</h1>
      <p className="text-[#828282] text-center">
        Your email has been confirmed you can now access your Tinapay dashboard!
      </p>

      <NavLink
        to={"/auth/login"}
        className="text-lg text-tinaColor font-semibold underline underline-offset-2"
      >
        Login to your account
      </NavLink>
    </div>
  );
}
