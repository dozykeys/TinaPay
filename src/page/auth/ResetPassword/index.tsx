/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "../../../assets/auth/logo.svg";
import phone from "../../../assets/auth/phone.svg";
import { supabase } from "../../../constants/supabase";
import { useState } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function ResetPassword() {
  const [loader, setLoader] = useState(false);
  //   const [newPassword, setNewPassword] = useState("");

  //   const [trigger, setTrigger] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const sendPasswordReset = async (data: any) => {
    // e.preventDefault();
    setLoader(true);

    const { password } = data;

    // setNewPassword(password);

    // setTrigger(true);

    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log({ event });

      if (session?.user.email) {
        setTimeout(() => {
          toast.custom(
            <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
              Password updated successfully
            </div>
          );
          setLoader(false);
          // window.location.replace('/auth/login')
        }, 10000);

        const { data, error } = await supabase.auth.updateUser({
          password: password,
        });

        // console.log({ data, error });

        if (data) {
          toast.custom(
            <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
              Password updated successfully
            </div>
          );

          setLoader(false);
          window.location.replace('/auth/login')
        }
        if (error) {
          toast.custom(
            <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
              There was an error updating your password.
            </div>
          );

          setLoader(false);
          return;
        }
      } else {
        toast.custom(
          <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
            Link Expired
          </div>
        );

        setLoader(false);
        return;
      }
    });
  };

  //   useEffect(() => {
  //     if (trigger) {
  //       supabase.auth.onAuthStateChange(async (event) => {
  //         if (event == "PASSWORD_RECOVERY") {
  //           const { data, error } = await supabase.auth.updateUser({
  //             password: newPassword,
  //           });

  //           if (data) {
  //             toast.custom(
  //               <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
  //                 Password updated successfully
  //               </div>
  //             );

  //             setLoader(false);
  //             return;
  //           }
  //           if (error) {
  //             toast.custom(
  //               <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
  //                 There was an error updating your password.
  //               </div>
  //             );

  //             setLoader(false);
  //             return;
  //           }
  //         } else {
  //           toast.custom(
  //             <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
  //               An error occured, try again
  //             </div>
  //           );

  //           setLoader(false);
  //           return;
  //         }
  //       });
  //     }
  //   }, [trigger]);

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
              Reset Your Password
            </h1>

            <form
              action=""
              onSubmit={handleSubmit(sendPasswordReset)}
              className="w-full mt-3 space-y-3 text-sm"
            >
              <div className="flex w-full flex-col gap-2 items-start">
                <label htmlFor="password">Password*</label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Enter Password"
                  className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>

              <div className="flex w-full flex-col gap-2 items-start">
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Enter Password"
                  className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
                />
                <p className="text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              </div>

              <button
                type="submit"
                className="bg-[#3F622E] w-full py-5 px-3 md:p-2 text-white rounded"
              >
                {loader ? (
                  <BeatLoader color="#fff" size={10} />
                ) : (
                  "Reset Password"
                )}
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
