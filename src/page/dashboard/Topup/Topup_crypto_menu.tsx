/* eslint-disable react-hooks/exhaustive-deps */
import arrow from "../../../assets/dashboard/topup/arrow.svg";

import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa6";
import { PiCurrencyBtcFill } from "react-icons/pi";
import { useContext, useState } from "react";
import BtcModal from "./Modal/BtcModal";
import { UserData } from "../../../context/userDataContext";
import EthModal from "./Modal/EthModal";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import UsdtModal from "./Modal/UsdtModal";
import { SiTether } from "react-icons/si";

export default function Topup_crypto_menu() {
  const { walData } = useContext(UserData);

  const [btcOpen, setBtcOpen] = useState(false);
  const [ethOpen, setEthOpen] = useState(false);
  const [usdtOpen, setUsdtOpen] = useState(false);

  console.log({ walData });

  return (
    <>
      <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
        <TopNavbar name={"Crypto Topup"} />

        {/* cards */}
        <Link
          onClick={() => {
            setEthOpen(true);
            setBtcOpen(false);
            setUsdtOpen(false);
          }}
          to={"/topup_crypto_menu"}
          className="w-[95%] mx-auto cursor-pointer hover:bg-gray-100 shadow-lg flex justify-between p-5 items-center"
        >
          <div className="flex gap-5 md:gap-10 items-center">
            <FaEthereum size={25} className="text-[#3f622E]" />

            <div>
              <h1 className="font-semibold">Eth</h1>
              <p className="text-[#828282]">Click to copy Ethereum wallet</p>
            </div>
          </div>

          <img src={arrow} alt="" />
        </Link>

        {/* cards */}
        <Link
          onClick={() => {
            setBtcOpen(true);
            setEthOpen(false);
            setUsdtOpen(false);
          }}
          to={"/topup_crypto_menu"}
          className="w-[95%] mx-auto cursor-pointer hover:bg-gray-100 shadow-lg flex justify-between p-5 items-center"
        >
          <div className="flex gap-5 md:gap-10 items-center">
            <PiCurrencyBtcFill size={25} className="text-[#3f622E]" />

            <div>
              <h1 className="font-semibold">BTC</h1>
              <p className="text-[#828282]">Click to copy BTC wallet</p>
            </div>
          </div>

          <img src={arrow} alt="" />
        </Link>

        {/* cards */}
        <Link
          onClick={() => {
            setUsdtOpen(true);
            setEthOpen(false);
            setBtcOpen(false);
          }}
          to={"/topup_crypto_menu"}
          className="w-[95%] mx-auto cursor-pointer hover:bg-gray-100 shadow-lg flex justify-between p-5 items-center"
        >
          <div className="flex gap-5 md:gap-10 items-center">
            <SiTether size={25} className="text-[#3f622E]" />

            <div>
              <h1 className="font-semibold">USDT</h1>
              <p className="text-[#828282]">Click to copy USDT wallet</p>
            </div>
          </div>

          <img src={arrow} alt="" />
        </Link>
      </div>
      {walData && (
        <>
          {btcOpen && <BtcModal setBtcOpen={setBtcOpen} data={walData} />}
          {ethOpen && <EthModal setEthOpen={setEthOpen} data={walData} />}
          {usdtOpen && <UsdtModal setUsdtOpen={setUsdtOpen} data={walData} />}
        </>
      )}
    </>
  );
}
