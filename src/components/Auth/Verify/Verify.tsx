import { Link } from "react-router-dom";
import logo from "../../../assets/auth/logo.svg";
import phone from "../../../assets/auth/phone.svg";
import shield from "../../../assets/auth/shield.svg";
import VerificationInput from "react-verification-input";

export default function Verify() {
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
            <h1 className="text-[#161616] font-bold text-2xl">
              Verify Account
            </h1>
            <p className="text-[#828282] text-sm -mt-2">
              Kindly enter the OTP sent to your email{" "}
              <span className="text-[#161616]">ololo*********</span>
            </p>

            <form
              action=""
              className="w-full flex flex-col items-center mt-3 space-y-3 text-sm"
            >
              <div className="flex md:w-full w-4/5 mb-5 flex-col justify-center items-center gap-2">
                <VerificationInput
                  classNames={{
                    container: "container",
                    character: "character",
                    characterInactive: "character--inactive",
                    characterSelected: "character--selected",
                    characterFilled: "character--filled",
                  }}
                />
              </div>

              <button
                type="submit"
                className="bg-[#3F622E] w-full py-4  md:py-3 text-white rounded"
              >
                Verify Account
              </button>

              <div className="flex gap-2 w-full justify-center items-center">
                <img src={shield} width={20} alt="" />
                <p className="text-center text-xs text-[#676767]">
                  Resend Code in <span className="text-[#5DAD19]">60s</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-end md:w-2/5 bg-[#F8F0E5]">
        <h1 className="text-[#3F622E] text-7xl text-start w-[90%] mx-auto font-extrabold">
          Experience Next Level Trading
        </h1>
        <div className="w-[90%] mx-auto">
          <img src={phone} width={300} alt="phone" />
        </div>
      </div>
    </div>
  );
}
