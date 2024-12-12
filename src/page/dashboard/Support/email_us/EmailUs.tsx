import { PiCopySimpleFill } from "react-icons/pi";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

import serviceImg from "../../../../assets/dashboard/support/service.png";
import TopNavbar from "../../../../components/shared/Navbar/TopNavbar";

export default function EmailUs() {
  const handleCopy = () => {
    copy(`support@tinapay.co`, {
      debug: true,
      message: "Press #{key} to copy",
    });
    toast.success("copied!");
  };

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Email Us"} />

      <div className="w-full flex flex-col gap-7 items-center justify-center">
        <img src={serviceImg} alt="" />
        <div className="font-semibold text-lg text-center">
          <h1>Hi,</h1>
          <h1>How may we be of service today.</h1>
        </div>
        <p className="text-center text-lg">
          Send us an email, stating your Issue , and we will respond to you as
          soon as Possible click on Email
        </p>
        <a
          href="mailto:support@tinapay.co"
          className="p-4 cursor-pointer bg-[#f8f0e5] font-semibold text-tinaColor"
        >
          support@tinapay.co
        </a>

        <div className="flex gap-2 items-center cursor-pointer">
          <p>Copy</p>
          <PiCopySimpleFill
            onClick={handleCopy}
            className="hover:scale-125 cursor-pointer focus:text-green"
          />
        </div>
      </div>
    </div>
  );
}
