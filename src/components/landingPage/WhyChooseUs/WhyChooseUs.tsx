import support from "../../../assets/home/support.svg";
import secure from "../../../assets/home/secure.svg";
import wallet from "../../../assets/home/wallet.svg";
import { SectionWrapper } from "../../../hoc";
import { MotionDiv } from "../../../utils/Motion";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa6";
import { MdOutlineMultilineChart } from "react-icons/md";

function WhyChooseUs() {
  const scaleVariants = (duration: number) => {
    return {
      whileInView: {
        scale: [0, 1],
        opacity: [0, 1],
        transition: {
          duration,
          ease: "easeInOut",
        },
      },
    };
  };

  return (
    <div className="md:w-5/6 w-[90%] mx-auto flex flex-col justify-center gap-5 items-center text-center">
      <h1 className="text-3xl font-black"> Why Choose Us</h1>

      <div className="w-full md:w-2/3 mx-auto flex flex-col gap-5 md:flex-row">
        {/* section */}
        <MotionDiv
          variants={scaleVariants(0.3)}
          whileInView={scaleVariants(0.3).whileInView}
          className="grid grid-cols-1 w-full md:w-1/2 gap-4"
        >
          {/* card */}
          <div className="flex flex-col justify-start items-start gap-4 bg-[#F9FAFB] p-4 rounded-lg">
            <div className="text-[#3F622E] text-lg sm:text-xl font-bold space-x-1 lg:space-x-2 flex items-center">
              <img src={support} alt="support" />
              <p>24/7 Customer Support</p>
            </div>

            <div className="w-full text-[#4F4F4F] text-start text-xs">
              <p className="text-wrap">
                We value our customers and strive to provide exceptional support
                around the clock. Our dedicated customer support team is
                available 24/7 to assist you with any queries, concerns, or
                technical issues you may encounter.
              </p>
            </div>
          </div>
          {/* card */}
          <div className="flex flex-col justify-start items-start gap-4 bg-[#F6FFE8] p-4 rounded-lg">
            <div className="text-[#3F622E] text-lg sm:text-xl font-bold space-x-1 lg:space-x-2 flex items-center">
              <img src={wallet} alt="wallet" />
              <p>BTC & ETH Wallet</p>
            </div>

            <div className="w-full text-[#4F4F4F] text-start text-xs">
              <p className="text-wrap">
                At TinaPay, we offer a user-friendly and secure Bitcoin and ETH
                wallet for storing, sending, and receiving digital assets. Our
                wallet allows you to securely manage your Bitcoin and ETH
                holdings, ensuring that your digital assets are always safe.
              </p>
            </div>
          </div>
        </MotionDiv>

        {/* section */}
        <MotionDiv
          variants={scaleVariants(0.5)}
          whileInView={scaleVariants(0.5).whileInView}
          className="flex w-full md:w-1/2 flex-col justify-start items-start gap-4 bg-[#FFFAF4] p-4 rounded-lg"
        >
          <div className="text-[#3F622E] text-lg sm:text-xl font-bold space-x-1 lg:space-x-2 flex items-center">
            <img src={secure} alt="secure" />
            <p>Secure</p>
          </div>

          <div className="w-full text-[#4F4F4F] text-start text-xs">
            <p className="text-wrap">
              Our platform uses advanced encryption technology to protect your
              account information and transactions. We also employ strict
              internal controls and monitoring to prevent fraud and ensure
              compliance with regulatory requirements.
            </p>
          </div>

          <Link to={"/auth/login"}>
            {/* <img src={quickaction} alt="quickaction" /> */}

            <div className="container mx-auto p-4">
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-2 border-[#B4E0F9] text-left text-sm bg-[#E8F6FB] rounded-lg p-2 flex flex-col">
                  <FaWallet size={25} className="m-2 text-[#80CAD3]" />

                  <h3 className="font-bold">My Wallet</h3>
                  <p className="text-xs">
                    View the current and accurate crypto rates.
                  </p>
                </div>

                <div className="border-2 border-[#D3E5D1] text-left text-sm bg-[#EFF7EF] rounded-lg p-2 flex flex-col">
                  <MdOutlineMultilineChart
                    size={25}
                    className="m-2 text-[#B1BDA0]"
                  />

                  <h3 className="font-bold">Crypto Rates</h3>
                  <p className="text-xs">
                    See an overview of your cards and wallet.
                  </p>
                </div>

                <div className="border-2 border-[#CEDDF8] text-left text-sm bg-[#EBF0FF] rounded-lg p-2 flex flex-col">
                  <MdOutlineMultilineChart
                    size={25}
                    className="m-2 text-[#9AB9FF]"
                  />

                  <h3 className="font-bold">Subscriptions</h3>
                  <p className="text-xs">
                    View various services & subscriptions.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </MotionDiv>
      </div>
    </div>
  );
}

export default SectionWrapper(WhyChooseUs, "WhyChooseUs");
