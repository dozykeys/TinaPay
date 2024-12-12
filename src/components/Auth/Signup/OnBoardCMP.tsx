/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import logo from "../../../assets/auth/logo.svg";
import phoneImg from "../../../assets/auth/phone.svg";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Onboard1 from "./Onboard/Onboard1";
import Onboard2 from "./Onboard/Onboard2";
import { mergedSchema } from "./Onboard/OnboardSchema";
import PostDataService from "../../../utils/postData";
import { UserData } from "../../../context/userDataContext";

export default function OnBoardCMP() {
  const { user } = useContext(UserData);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [referral, setReferral] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bvn, setBvn] = useState("");
  const [address, setAddress] = useState("");

  // set step
  const [nextStep, setNextStep] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const handleSignUp = async () => {
    console.log("signup function");

    try {
      await mergedSchema.validate(
        {
          country,
          dob,
          gender,
          bvn,
          address,
          userName,
          phone,
          referral,
          firstName,
          lastName,
        },
        { abortEarly: false }
      );

      console.log("signing up...");
      console.log({
        country,
        dob,
        gender,
        bvn,
        address,
        userName,
        phone,
        referral,
        firstName,
        lastName,
      });

      await PostDataService.registerUser(
        user?.id,
        firstName,
        lastName,
        userName,
        user?.email,
        country,
        phone,
        bvn,
        gender,
        dob
      );

      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
          Onboarding complete!
        </div>
      );

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);

      // call signup
    } catch (error: any) {
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
          Fill the required fields
        </div>
      );
      return;
    }
  };

  return (
    <div className="w-full bg-[#F8F0E5] flex justify-center gap-5 min-h-screen items-center text-center">
      <div className="md:w-3/5 w-full min-h-screen flex justify-end bg-white">
        <div className="w-full py-10 flex flex-col items-center md:items-end bg-white">
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
          <div className="flex md:w-4/5 lg:w-1/2 w-[95%] md:mx-5 flex-col gap-3 md:gap-3 mt-7 md:mt-10">
            <h1 className="text-[#3F622E] font-bold text-xl">
              Complete Onboarding
            </h1>

            {/* steps */}
            <div className="flex w-3/6 mx-auto justify-center items-center">
              <button
                onClick={() => setNextStep(false)}
                className={`w-14 h-14 ${
                  nextStep
                    ? "border-4 border-green text-green"
                    : "bg-green text-white"
                } font-semibold rounded-full`}
              >
                1
              </button>
              <div className="h-[2px] bg-green w-2/5 mx-1"></div>
              <button
                onClick={() => {
                  if (phoneVerified) {
                    setNextStep(true);
                  } else {
                    toast.custom(
                      <div className="bg-gray-800 py-2 px-8 font-semibold text-white">
                        Click next to continue
                      </div>,
                      {
                        duration: 6000,
                      }
                    );
                    return;
                  }
                }}
                className={`w-14 h-14 ${
                  !nextStep
                    ? "border-4 border-green text-green"
                    : "bg-green text-white"
                } font-semibold rounded-full`}
              >
                2
              </button>
            </div>

            {/* Onboarding */}
            {!nextStep && (
              <Onboard1
                setNextStep={setNextStep}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setUserName={setUserName}
                setReferral={setReferral}
                setPhone={setPhone}
                userName={userName}
                phone={phone}
                firstName={firstName}
                lastName={lastName}
                referral={referral}
                setPhoneVerified={setPhoneVerified}
                phoneVerified={phoneVerified}
              />
            )}

            {nextStep && (
              <Onboard2
                setCountry={setCountry}
                setDob={setDob}
                setGender={setGender}
                setBvn={setBvn}
                setAddress={setAddress}
                country={country}
                dob={dob}
                gender={gender}
                bvn={bvn}
                address={address}
                firstName={firstName}
                lastName={lastName}
                signUpFunc={handleSignUp}
              />
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-end md:w-2/5 bg-[#F8F0E5] min-h-screen">
        <h1 className="text-[#3F622E] md:text-4xl lg:text-6xl text-start w-[90%] mx-auto font-extrabold">
          Experience Next Level Trading
        </h1>
        <div className="w-[90%] mx-auto">
          <img src={phoneImg} width={300} alt="phone" />
        </div>
      </div>
    </div>
  );
}
