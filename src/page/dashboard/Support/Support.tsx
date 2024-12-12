import rImg from "../../../assets/dashboard/support/right.svg";
import mail from "../../../assets/dashboard/support/mail.svg";
// import chat from "../../../assets/dashboard/support/chat.svg";
import faq from "../../../assets/dashboard/support/faq.svg";
// import whatsapp from "../../../assets/dashboard/support/whatsapp.png";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import { FaWhatsapp } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function Support() {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Support"} />

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* card */}
        <NavLink
          to={"/emailus"}
          className="w-full flex justify-between p-5 border shadow-xl text-lg hover:bg-[#eef1f3] cursor-pointer"
        >
          <div className="flex gap-2 items-center">
            <img src={mail} className="w-7" alt="" />

            <h1>Email Us</h1>
          </div>

          <img src={rImg} className="w-5" alt="" />
        </NavLink>

        {/* card */}
        {/* <div className="w-full flex justify-between p-5 border shadow-xl text-lg hover:bg-[#eef1f3] cursor-pointer">
          <div className="flex gap-2 items-center">
            <img src={chat} className="w-7" alt="" />

            <h1>Chat with us</h1>
          </div>

          <img src={rImg} className="w-5" alt="" />
        </div> */}

        {/* card */}
        <NavLink
          to={"/faq"}
          className="w-full flex justify-between p-5 border shadow-xl text-lg hover:bg-[#eef1f3] cursor-pointer"
        >
          <div className="flex gap-2 items-center">
            <img src={faq} className="w-7" alt="" />

            <h1>FAQs</h1>
          </div>

          <img src={rImg} className="w-5" alt="" />
        </NavLink>
        <NavLink
          to={"/whatsapp"}
          className="w-full flex justify-between p-5 border shadow-xl text-lg hover:bg-[#eef1f3] cursor-pointer"
        >
          <div className="flex gap-2 items-center">
            {/* <img src={<FaWhatsapp} className="w-7" alt="" /> */}
            <FaWhatsapp size="30" />

            <h1>Whatsapp</h1>
          </div>

          <img src={rImg} className="w-5" alt="" />
        </NavLink>
      </div>
    </div>
  );
}
