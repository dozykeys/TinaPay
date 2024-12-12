import { FaWifi } from "react-icons/fa6";
import { MdPhoneEnabled } from "react-icons/md";
import { Link } from "react-router-dom";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";

export default function Bills() {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Bills"} />
      <div className="flex gap-5 items-center my-5">
        {/* card */}
        <Link
          to={"/bills/airtime"}
          className="flex flex-col cursor-pointer hover:bg-gray-300 hover:scale-95 items-center justify-center gap-3 py-5 px-10 md:py-10 md:px-20 bg-[#e0e0e0] rounded"
        >
          <MdPhoneEnabled size={25} className="text-[#315B12]" />
          <h1> Airtime</h1>
        </Link>

        {/* card */}
        <Link
          to={"/bills/data"}
          className="flex flex-col cursor-pointer hover:bg-gray-300 hover:scale-95 items-center justify-center gap-3 py-5 px-10 md:py-10 md:px-20 bg-[#e0e0e0] rounded"
        >
          <FaWifi size={25} className="text-[#315B12]" />
          <h1> Data</h1>
        </Link>
      </div>
    </div>
  );
}
