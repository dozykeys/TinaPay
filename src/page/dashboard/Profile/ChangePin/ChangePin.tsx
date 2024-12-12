/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { supabase } from "../../../../constants/supabase";
import toast from "react-hot-toast";
import TopNavbar from "../../../../components/shared/Navbar/TopNavbar";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { BeatLoader } from "react-spinners";
import { UserData } from "../../../../context/userDataContext";

export default function ChangePin() {
  const [oldPin, setOldPin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dis1, setDis1] = useState(true);
  const [dis2, setDis2] = useState(true);
  const [dis3, setDis3] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useContext(UserData);

  // console.log({ userInfo });

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (userInfo?.account_pin != oldPin) {
      toast.error("Old pin is not correct");
      setIsLoading(false);
      return;
    }

    if (password != confirmPassword) {
      toast.error("password does not match");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
      return;
    }
    await supabase
      .from("user_info")
      .update({
        account_pin: password,
      })
      .eq("user_id_fk", userInfo?.user_id_fk);

    // console.log({ data, error });

    // toast.success("pin changed successfully");

    toast.custom(
      <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
        pin changed successfully
      </div>
    );
    setTimeout(() => {
      window.location.href = "/profile";
    }, 1500);
    setIsLoading(false);
  };

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Reset Transaction PIN"} />

      <form onSubmit={handleChangePassword} className="w-full space-y-5">
        <div className="w-full space-y-2">
          <h1 className="text-lg">Old Pin</h1>
          <div className="flex items-center px-2 border w-full justify-between">
            <input
              required
              type={`${dis3 ? "password" : "text"}`}
              onChange={(e) => setOldPin(e.target.value)}
              className="w-full rounded p-4 outline-none"
            />
            <div className="cursor-pointer" onClick={() => setDis3(!dis3)}>
              {dis3 ? <IoIosEyeOff size={25} /> : <IoIosEye size={25} />}
            </div>
          </div>
        </div>
        <div className="w-full space-y-2">
          <h1 className="text-lg">New Pin</h1>
          <div className="flex items-center px-2 border w-full justify-between">
            <input
              required
              type={`${dis1 ? "password" : "text"}`}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded p-4 outline-none"
            />
            <div className="cursor-pointer" onClick={() => setDis1(!dis1)}>
              {dis1 ? <IoIosEyeOff size={25} /> : <IoIosEye size={25} />}
            </div>
          </div>
        </div>
        <div className="w-full space-y-2">
          <h1 className="text-lg">Confirm New Pin</h1>

          <div className="flex items-center px-2 border w-full justify-between">
            <input
              required
              type={`${dis2 ? "password" : "text"}`}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded p-4 outline-none"
            />
            <div className="cursor-pointer" onClick={() => setDis2(!dis2)}>
              {dis2 ? <IoIosEyeOff size={25} /> : <IoIosEye size={25} />}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-4 rounded text-lg bg-tinaColor text-white"
        >
          {isLoading ? (
            <BeatLoader color="#fff" size={10} />
          ) : (
            " Update Password"
          )}
        </button>
      </form>
    </div>
  );
}
