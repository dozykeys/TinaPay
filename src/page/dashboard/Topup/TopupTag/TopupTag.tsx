import { useContext } from "react";
import { UserData } from "../../../../context/userDataContext";
import copy from "copy-to-clipboard";

import TopNavbar from "../../../../components/shared/Navbar/TopNavbar";
import { PiCopySimpleFill } from "react-icons/pi";
import toast from "react-hot-toast";

export default function TopupTag() {
  const { userInfo } = useContext(UserData);

  const handleCopy = () => {
    copy(`${userInfo?.tag}`, {
      debug: true,
      message: "Press #{key} to copy",
    });
    toast.success("copied!");
  };

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Tina Tag"} />

      <div className="w-full bg-[#f9f9f9] flex flex-col gap-5 p-5 rounded-lg md:p-10">
        <h1>User Details</h1>

        {/* account name */}
        <div className="space-y-2 w-full">
          <h1 className="text-[91B9E6]">Tina tag</h1>

          <div className="w-full flex justify-between items-center">
            <h2 className="font-bold text-lg">{userInfo?.tag}</h2>
            <PiCopySimpleFill
              size={25}
              onClick={handleCopy}
              className="hover:scale-125 cursor-pointer focus:text-green"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
