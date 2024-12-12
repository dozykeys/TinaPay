/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "../../../assets/auth/logo.svg";
import phone from "../../../assets/auth/phone.svg";
import { supabase } from "../../../constants/supabase";
import { useState } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loader, setLoader] = useState(false);

  const sendPasswordReset = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    // console.log({ url: `${import.meta.env.VITE_WEB_URL}/auth/reset_password` });

    await supabase.auth
      .resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.VITE_WEB_URL}/reset_password`,
      })
      .then(() => {
        toast.custom(
          <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
            Password reset link, sent successfully
          </div>
        );

        setEmail("");
        setLoader(false);
      })
      .catch(() => {
        toast.custom(
          <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
            An error occured, try again
          </div>
        );
        setEmail("");
        setLoader(false);
      });
  };

  return (
    <div className="w-full bg-[#F8F0E5] flex justify-center gap-5 min-h-screen items-center text-center">
      <div className="md:w-3/5 w-full min-h-screen bg-white flex justify-end">
        <div className="w-full py-10 flex flex-col items-center md:items-end">
          <Link
            className="cursor-pointer w-full flex flex-col items-center"
            to={"/"}
          >
            <img
              src={logo}
              width={200}
              alt="logo"
              className="mx-auto hidden md:flex"
            />
            <img
              src={logo}
              width={120}
              alt="logo"
              className="mx-auto flex md:hidden"
            />
          </Link>
          <div className="flex md:w-3/5 lg:w-1/2 w-[95%] md:mx-5 flex-col gap-3 mt-10">
            <h1 className="text-[#3F622E] font-bold text-xl">
              Forgot Password?
            </h1>
            <p className="text-[#828282]">
              Provide your email to send a password reset link
            </p>

            <form
              action=""
              onSubmit={sendPasswordReset}
              className="w-full mt-3 space-y-3 text-sm"
            >
              <div className="flex w-full flex-col gap-2 items-start">
                <label htmlFor="email">Email*</label>
                <input
                  name="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#3F622E] w-full py-5 px-3 md:p-2 text-white rounded"
              >
                {loader ? <BeatLoader color="#fff" size={10} /> : "Send Link"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-end md:w-2/5 bg-[#F8F0E5]">
        <h1 className="text-[#3F622E] md:text-4xl lg:text-6xl text-start w-[90%] mx-auto font-extrabold">
          Experience Next Level Trading
        </h1>
        <div className="w-[90%] mx-auto">
          <img src={phone} width={300} alt="phone" />
        </div>
      </div>
    </div>
  );
}
