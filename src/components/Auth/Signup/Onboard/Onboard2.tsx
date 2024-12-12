/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import countrydata from "../../../../constants/country_state.json";
import { BeatLoader } from "react-spinners";
import { onboard2Schema } from "./OnboardSchema";
import GetDataService from "../../../../utils/getData";
import toast from "react-hot-toast";

interface Errors {
  [key: string]: string;
}

interface Props {
  setCountry: (country: string) => void;
  setDob: (dob: string) => void;
  setGender: (gender: string) => void;
  setBvn: (bvn: string) => void;
  setAddress: (address: string) => void;
  country: string;
  dob: any;
  gender: string;
  bvn: any;
  address: string;
  firstName: string;
  lastName: string;
  signUpFunc: any;
}

export default function Onboard2({
  setCountry,
  setDob,
  setGender,
  setBvn,
  setAddress,
  country,
  dob,
  gender,
  bvn,
  address,
  firstName,
  lastName,
  signUpFunc,
}: Props) {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [bvnUsed, setBvnUsed] = useState(false);
  const [bvnMatch, setBvnMatch] = useState(false);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);

    if (bvnMatch || !bvnUsed) {
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
          {bvnMatch && "Bvn does not match name provided"}
          {/* {bvnUsed && "Bvn already in use"} */}
        </div>
      );
      setLoader(false);

      return;
    }

    try {
      await onboard2Schema.validate(
        {
          country,
          dob,
          gender,
          bvn,
          address,
        },
        { abortEarly: false }
      );

      // call signup
      try {
        await signUpFunc();
      } catch (error) {
        toast.custom(
          <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
            Error signing up try again
          </div>
        );
        setLoader(false);

        return;
      }

      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      const validationErrors: Errors = {};
      error.inner.forEach((err: any) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  const checkBvnUsed = async () => {
    try {
      await GetDataService.checkIfBvnExist(bvn);
      setBvnUsed(false);
    } catch (error) {
      setBvnUsed(true);
    }
  };

  const checkBvnMatch = async () => {
    try {
      await GetDataService.checkBvnMatch(firstName, lastName, bvn);
      setBvnMatch(false);
    } catch (error) {
      setBvnMatch(true);
    }
  };

  useEffect(() => {
    checkBvnUsed();
    checkBvnMatch();
  }, [bvn]);

  return (
    <form
      action=""
      onSubmit={(e) => handleSignUp(e)}
      className="w-full mt-3 space-y-3 text-sm"
    >
      {/* country */}
      <div className="flex w-full flex-col gap-2 items-start">
        <label htmlFor="country">
          Select Country <span className="text-red-500 text-lg">*</span>
        </label>
        <select
          name="country"
          value={country}
          className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
          onChange={handleCountryChange}
        >
          <option value="">--Select Country--</option>
          {countrydata.map((getcountry: any, index: number) => (
            <option value={getcountry.country_name} key={index}>
              {getcountry.country_name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-500 text-start">{errors.country}</p>
        )}
      </div>

      {/* dob */}
      <div className="flex w-full flex-col gap-2 items-start">
        <label htmlFor="dob">
          Date of Birth <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="date"
          value={dob}
          onChange={handleDobChange}
          placeholder="Enter Date of Birth"
          className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
        />
        {errors.dob && <p className="text-red-500 text-start">{errors.dob}</p>}
      </div>

      {/* gender */}
      <div className="flex w-full flex-col gap-2 items-start">
        <label htmlFor="gender">
          Select Gender <span className="text-red-500 text-lg">*</span>
        </label>
        <select
          name="gender"
          value={gender}
          className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
          onChange={handleGenderChange}
        >
          <option value="">--Select Gender--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-start">{errors.gender}</p>
        )}
      </div>

      {/* bvn */}
      <div className="flex w-full flex-col gap-2 items-start">
        <label htmlFor="bvn">
          Input BVN <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="text"
          value={bvn}
          onChange={(e) => setBvn(e.target.value)}
          placeholder="Input Valid BVN"
          className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
        />
        {errors.bvn && <p className="text-red-500 text-start">{errors.bvn}</p>}
      </div>

      {/* {bvnUsed && <p className="text-red-500 text-start">BVN already in use</p>} */}

      {bvnMatch && (
        <p className="text-red-500 text-start">
          BVN name does not match {firstName} {lastName}
        </p>
      )}

      {/* address */}
      <div className="flex w-full flex-col gap-2 items-start">
        <label htmlFor="address">
          Valid Address <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Your Address"
          className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
        />
        {errors.address && (
          <p className="text-red-500 text-start">{errors.address}</p>
        )}
      </div>

      <p className="pt-5 w-4/5 mx-auto text-center">
        By clicking continue to create an account, you agree to our{" "}
        <span className="text-[#3F622E] font-bold">Terms of Conditions </span>{" "}
        and <span className="text-[#3F622E] font-bold">Privacy Policy</span>
      </p>

      <button
        type="submit"
        className="bg-[#3F622E] w-full py-5 px-3 md:p-4 text-white rounded"
      >
        {loader ? <BeatLoader color="#fff" size={10} /> : "Create Account"}
      </button>
    </form>
  );
}
