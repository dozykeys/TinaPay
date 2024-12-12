import { SectionWrapper } from "../../../hoc";
import { MotionDiv } from "../../../utils/Motion";
import { FaBtc } from "react-icons/fa6";
import { SiEthereum, SiTether } from "react-icons/si";

function Rates() {
  const cryptoData = [
    {
      name: "BTC",
      icon: <FaBtc size={30} className="p-2 rounded-full bg-orange-100" />,
      value: "₦56,990,226",
      change: "-2.24%",
      changeAmount: "₦1,277,956",
      timePeriod: "Over the last day",
      color: "#F7931A",
    },
    {
      name: "USDT",
      icon: <SiTether size={30} className="p-2 rounded-full bg-green-100" />, // Adjust the icon accordingly
      value: "₦1,240",
      change: "+0.0%",
      changeAmount: "₦0",
      timePeriod: "Over the last day",
      color: "#SomeColor",
    },
    {
      name: "ETH",
      icon: <SiEthereum size={30} className="p-2 rounded-full bg-purple-100" />, // Adjust the icon accordingly
      value: "₦3,280,755",
      change: "-0.45%",
      changeAmount: "₦14,813",
      timePeriod: "Over the last day",
      color: "#SomeColor",
    },
  ];

  const scaleVariants = {
    whileInView: {
      scale: [0, 1],
      opacity: [0, 1],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="md:w-5/6 w-[90%] mx-auto flex flex-col justify-center gap-5 items-center text-center">
      <h1 className="text-3xl md:text-4xl md:w-1/2 font-bold">
        Unlock Unbelievable Conversion Rates!
      </h1>
      <p className="md:w-1/2 text-sm">
        At Tinapay, we understand that you want the most value from your crypto
        assets. That's why we offer incredible conversion rates that can't be
        beaten.
      </p>

      <div className="flex gap-2 text-sm md:text-md bg-[#F9FAFB] p-4 items-center rounded-md">
        <button className="p-2 bg-[#3F622E] text-[#FCEBAA] rounded px-6">
          Buying
        </button>
        <button className="p-2 bg-[#ECECEC] text-[#676767] rounded px-6">
          Selling
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 -mt-5 bg-[#F9FAFB] p-2 md:p-4 items-center rounded-md">
        {/* card */}
        {cryptoData.map((crypto, index) => (
          <MotionDiv
            variants={scaleVariants}
            whileInView={scaleVariants.whileInView}
            key={index}
            className={`flex text-sm md:text-md flex-col gap-1 items-start bg-white p-2 md:p-4 rounded-md text-${crypto.color}`}
          >
            <div className="flex items-center gap-1 font-semibold">
              {crypto.icon}
              <p>{crypto.name}</p>
            </div>
            <p className="font-bold text-xs md:text-md">{crypto.value}</p>
            <p
              className={`text-[8px] ${
                crypto.change[0] == "+" ? "text-[#27AE60]" : "text-[#EB5757]"
              }`}
            >
              {crypto.change} ({crypto.changeAmount})
              <span className="text-[#8E8E8E]"> {crypto.timePeriod}</span>
            </p>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
}

export default SectionWrapper(Rates, "Rates");
