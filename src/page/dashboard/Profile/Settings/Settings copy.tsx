import { PiCopySimpleFill } from "react-icons/pi";
import TopNavbar from "../../../../components/shared/Navbar/TopNavbar";
import { useContext, useState } from "react";
import { UserData } from "../../../../context/userDataContext";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

export default function Settings() {
  const { userInfo, user } = useContext(UserData);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tag, setTag] = useState("");

  console.log({ userInfo });

  const handleCopy = () => {
    copy(`${userInfo.tag}`, {
      debug: true,
      message: "Press #{key} to copy",
    });
    toast.success("Tinatag has been copied!");
  };

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Settings"} />

      <div className="w-full py-10 space-y-5 mb-10">
        {/* circle */}
        <div className="w-40 h-40 mx-auto border-4 rounded-full border-green bg-[#f8f0e5] flex justify-center items-center">
          <h1 className="text-4xl font-semibold">DO</h1>
        </div>

        {/* tinatag */}
        <div className="space-y-3 text-center">
          <div className="w-full flex gap-2 justify-center text-center items-center cursor-pointer">
            @ {userInfo?.tag}
            <PiCopySimpleFill
              onClick={handleCopy}
              className="hover:scale-125 cursor-pointer focus:text-green"
            />
          </div>
        </div>

        {/*form  */}
        <div className="flex flex-col gap-5 w-[95%] mx-auto">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName || userInfo?.first_name}
            className="border-b p-2 border-b-gray-400 outline-none focus:border-b-gray-700"
            type="text"
            placeholder="First Name"
          />

          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName || userInfo?.last_name}
            className="border-b p-2 border-b-gray-400 outline-none focus:border-b-gray-700"
            type="text"
            placeholder="Last Name"
          />

          <input
            value={user?.email}
            disabled
            className="border-b p-2 border-b-gray-400 outline-none focus:border-b-gray-700"
            type="text"
            placeholder="Email"
          />

          <div className="flex gap-2 items-center w-full mx-auto">
            <p className="px-4 py-2 bg-gray-300 font-bold">@</p>
            <div className="w-full flex flex-col gap-2">
              <input
                onChange={(e) => setTag(e.target.value)}
                value={tag || userInfo?.tag}
                className="border-b w-full p-2 border-b-gray-400 outline-none focus:border-b-gray-700"
                type="text"
                placeholder="tina tag"
              />
            </div>
          </div>

          <button className="bg-tinaColor hover:opacity-85 p-3 text-white w-full mx-auto rounded">
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
}
