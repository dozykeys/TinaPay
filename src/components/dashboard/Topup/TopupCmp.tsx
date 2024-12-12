import arrow from "../../../assets/dashboard/topup/arrow.svg";
import coin from "../../../assets/dashboard/topup/coin.svg";
import bank from "../../../assets/dashboard/topup/bank.svg";
import tag from "../../../assets/dashboard/topup/tag.svg";
import { Link } from "react-router-dom";
import TopNavbar from "../../shared/Navbar/TopNavbar";

export default function TopupCmp() {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Topup"} />

      {/* cards */}
      <Link
        to={"/topup_crypto_menu"}
        className="w-[95%] mx-auto cursor-pointer hover:bg-gray-100 shadow-lg flex justify-between p-5 items-center"
      >
        <div className="flex gap-5 md:gap-10 items-center">
          <img src={coin} alt="" />

          <div>
            <h1 className="font-semibold">Crypto wallet</h1>
            <p className="text-[#828282]">Topup using ETH and BTC</p>
          </div>
        </div>

        <img src={arrow} alt="" />
      </Link>

      {/* cards */}
      <Link
        to={"/bank_details"}
        className="w-[95%] mx-auto cursor-pointer hover:bg-gray-100 shadow-lg flex justify-between p-5 items-center"
      >
        <div className="flex gap-5 md:gap-10 items-center">
          <img src={bank} alt="" />

          <div>
            <h1 className="font-semibold">Bank Transfer</h1>
            <p className="text-[#828282]">
              Topup using your tinapay bank account details
            </p>
          </div>
        </div>

        <img src={arrow} alt="" />
      </Link>

      {/* cards */}
      <Link
        to={"/tinapay_tag"}
        className="w-[95%] mx-auto cursor-pointer hover:bg-gray-100 shadow-lg flex justify-between p-5 items-center"
      >
        <div className="flex gap-5 md:gap-10 items-center">
          <img src={tag} alt="" />

          <div>
            <h1 className="font-semibold">Tinapay Tag</h1>
            <p className="text-[#828282]">Topup using your tinapay tag</p>
          </div>
        </div>

        <img src={arrow} alt="" />
      </Link>
    </div>
  );
}
