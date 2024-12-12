
import { useContext } from "react";
import { UserData } from "../../../context/userDataContext";
import coinImg from "../../../assets/dashboard/rate/coin-fill.svg";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";

export default function Rate() {
  const { rate } = useContext(UserData);
  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Rates"} />
      <div className="grid grid-cols-1 gap-5">
        {/* card */}
        <div className="w-full flex justify-between items-center border shadow p-4 rounded-lg">
          <div className="flex gap-5 items-center">
            <img src={coinImg} alt="" />

            <div className="block">
              <h1 className="font-semibold text-lg">Buy Coin</h1>
              <p className="text-xs text-[#9e9e9e]">Buying rate</p>
            </div>
          </div>

          <button className="p-2 rounded-lg text-white font-[500] bg-tinaColor">
            $1 <span className="text-[#ffeb3b]">=</span> ₦{rate?.buying}
          </button>
        </div>

        {/* card */}
        <div className="w-full flex justify-between items-center border shadow p-4 rounded-lg">
          <div className="flex gap-5 items-center">
            <img src={coinImg} alt="" />

            <div className="block">
              <h1 className="font-semibold text-lg">Sell Coin</h1>
              <p className="text-xs text-[#9e9e9e]">Selling rate</p>
            </div>
          </div>

          <button className="p-2 rounded-lg text-white font-[500] bg-tinaColor">
            $1 <span className="text-[#ffeb3b]">=</span> ₦{rate?.selling}
          </button>
        </div>
      </div>
    </div>
  );
}
