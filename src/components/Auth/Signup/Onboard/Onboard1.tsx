/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { onboard1Schema } from "./OnboardSchema";
import GetDataService from "../../../../utils/getData";
import VerifyPhone from "./VerifyPhone";
import PostDataService from "../../../../utils/postData";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

interface Errors {
  [key: string]: string;
}

interface Props {
  setNextStep: (nextStep: boolean) => void;
  setLastName: (lastName: string) => void;
  setFirstName: (firstName: string) => void;
  setUserName: (userName: string) => void;
  setReferral: (referral: string) => void;
  setPhone: (phone: string) => void;
  setPhoneVerified: (phone: boolean) => void;
  userName: string;
  phone: any;
  firstName: string;
  lastName: string;
  referral: string;
  phoneVerified: boolean;
}
export default function Onboard1({
  setNextStep,
  setLastName,
  setFirstName,
  setUserName,
  setReferral,
  setPhoneVerified,
  setPhone,
  userName,
  phone,
  referral,
  firstName,
  lastName,
  phoneVerified,
}: Props) {
  // const { user } = useContext(UserData);

  // console.log({ user });

  const [errors, setErrors] = useState<Errors>({});
  const [tagUsed, setTagUsed] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [pinId, setPinId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // console.log({ name, value });

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "referral":
        setReferral(value);
        break;
      default:
        break;
    }
  };

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onboard1Schema.validate(
        { userName, phone, referral, firstName, lastName },
        { abortEarly: false }
      );

      if (!phoneVerified) {
        toast.custom(
          <div className="bg-gray-800 py-2 px-8 font-semibold text-white">
            send otp to verify phone number
          </div>,
          {
            duration: 6000,
          }
        );
        return;
      }

      setNextStep(true);
    } catch (error: any) {
      const validationErrors: Errors = {};
      error.inner.forEach((err: any) => {
        // Specify the type for err
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }

    try {
      await onboard1Schema.validate(
        { userName, phone, referral, firstName, lastName },
        { abortEarly: false }
      );

      setNextStep(true);
    } catch (error: any) {
      const validationErrors: Errors = {};
      if (error.inner) {
        error.inner.forEach((err: any) => {
          // Specify the type for err
          validationErrors[err.path] = err.message;
        });
      } else {
        console.error("Validation error:", error);
      }
      setErrors(validationErrors);
    }
  };

  const checkUserName = async () => {
    try {
      await GetDataService.checkTinaTag(userName);
      setTagUsed(false);
    } catch (error) {
      setTagUsed(true);
    }
  };

  const handleGetOtp = async () => {
    setLoader(true);

    if (!phone) {
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
          Phone Number is required
        </div>
      );
      setLoader(false);
      return;
    }

    try {
      const res: any = await PostDataService.getOTP(phone);
      console.log("here");
      console.log({ res });

      setPinId(res?.pinId);

      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
          Otp Sent!{" "}
        </div>
      );
      setSendOtp(true);
      setLoader(false);
    } catch (err) {
      console.log(err);
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
          An error occured try again
        </div>
      );
      setSendOtp(false);
      setLoader(false);
    }
  };

  useEffect(() => {
    checkUserName();
  }, [userName]);

  return (
    <form
      onSubmit={(e) => handleProceed(e)}
      className="w-full mt-3 space-y-3 text-sm"
    >
      {/* name */}
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="flex w-full flex-col gap-2 items-start">
          <label htmlFor="firstName">
            First Name <span className="text-red-500 text-lg">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
            className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
          />
          {errors.firstName && (
            <p className="text-red-500 text-start">{errors.firstName}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-2 items-start">
          <label htmlFor="lastName">
            Last Name <span className="text-red-500 text-lg">*</span>
          </label>
          <input
            type="text"
            value={lastName}
            name="lastName"
            onChange={handleChange}
            placeholder="Enter Last Name"
            className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
          />
          {errors.lastName && (
            <p className="text-red-500 text-start">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* phone */}
      <div className="flex w-full flex-col gap-1 items-start">
        <label htmlFor="phone">
          Phone Number <span className="text-red-500 text-lg">*</span>
        </label>
        <PhoneInput
          country={"ng"}
          inputStyle={{ width: "100%", border: "1px solid #315B12" }}
          buttonStyle={{ border: "1px solid #315B12" }}
          onChange={(phone) => setPhone(phone)}
          value={phone}
          inputProps={{
            required: true,
            name: "phone",
          }}
        />

        <div className="w-full flex justify-end">
          {/* button */}
          <div
            onClick={handleGetOtp}
            className="text-tinaColor cursor-pointer underline underline-offset-2 font-semibold text-end"
          >
            {!phoneVerified && (
              <p style={{fontSize:"16px"}}>
                {" "}
                {loader ? <BeatLoader color="#1b5e20" size={5} /> : "send otp"}
              </p>
            )}

            {phoneVerified && "verified"}
          </div>
        </div>
      </div>
      {errors.phone && (
        <p className="text-red-500 text-start">{errors.phone}</p>
      )}

      {/* username */}
      <div className="flex w-full flex-col gap-2 items-start">
        <label htmlFor="userName">
          Username <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="text"
          value={userName}
          name="userName"
          onChange={handleChange}
          placeholder="Enter Username"
          className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
        />
      </div>
      {tagUsed && (
        <p className="text-red-500 text-start">Username already exists</p>
      )}
      {errors.userName && (
        <p className="text-red-500 text-start">{errors.userName}</p>
      )}

      {/* referral */}
      <div className="flex w-full flex-col gap-2 items-start">
        <label htmlFor="referral">Provide Referral Code</label>
        <input
          type="text"
          name="referral"
          value={referral}
          onChange={handleChange}
          placeholder="Provide Referral Code"
          className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
        />
      </div>
      {errors.referral && (
        <p className="text-red-500 text-start">{errors.referral}</p>
      )}

      <button
        type="submit"
        className="bg-[#3F622E] w-full py-5 px-3 md:p-2 text-white rounded"
      >
        Proceed
      </button>

      {sendOtp && (
        <VerifyPhone
          phone={phone}
          pinId={pinId}
          btnName="Verify"
          setModal={setSendOtp}
          setVerifed={setPhoneVerified}
        />
      )}
    </form>
  );
}
