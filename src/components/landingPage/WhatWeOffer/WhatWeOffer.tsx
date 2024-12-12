import offer1 from "../../../assets/home/offer1.svg";
import { SectionWrapper } from "../../../hoc";
import { MotionDiv } from "../../../utils/Motion";

function WhatWeOffer() {
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
    <div className="md:w-5/6 w-[90%] mx-auto flex flex-col md:flex-row justify-center gap-5 items-center text-center">
      <img src={offer1} alt="offer1" className="w-[100%] md:w-[26rem]" />
      <div className="flex flex-col gap-5">
        {/* card */}
        <MotionDiv
          variants={scaleVariants}
          whileInView={scaleVariants.whileInView}
          className="flex flex-col justify-start items-start bg-[#F9FAFB] p-4 rounded-lg"
        >
          <h1 className="text-[#3F622E] text-lg sm:text-xl font-bold">
            ⚡Speed and Convenience
          </h1>
          <ul className="md:w-96 text-[#4F4F4F] text-start text-xs">
            <li className="flex gap-1 items-start">
              <span className="font-bold text-xl"> . </span>
              <p>
                Tired of waiting for slow transfers? With Tinapay, you can enjoy
                instant crypto to bank transfers.
              </p>
            </li>
            <li className="flex gap-1 items-start">
              <span className="font-bold text-xl"> . </span>{" "}
              <p>
                No more long processing times or delays. We've streamlined the
                process for your convenience.
              </p>
            </li>
          </ul>
        </MotionDiv>
        {/* card */}
        <MotionDiv
          variants={scaleVariants}
          whileInView={scaleVariants.whileInView}
          className="flex flex-col justify-start items-start bg-[#F9FAFB] p-4 rounded-lg"
        >
          <h1 className="text-[#3F622E] text-lg sm:text-xl font-bold">
            🔒Secure and Reliable
          </h1>

          <ul className="md:w-96 text-[#4F4F4F] text-start text-xs">
            <li className="flex gap-1 items-start">
              <span className="font-bold text-xl"> . </span>
              <p>
                Security is our top priority. We use cutting-edge encryption to
                protect your transactions and personal information.
              </p>
            </li>
            <li className="flex gap-1 items-start">
              <span className="font-bold text-xl"> . </span>
              <p>
                Rest easy knowing your funds are in safe hands, backed by a team
                of experts in blockchain and financial technology.
              </p>
            </li>
          </ul>
        </MotionDiv>
        {/* card */}
        <MotionDiv
          variants={scaleVariants}
          whileInView={scaleVariants.whileInView}
          className="flex flex-col justify-start items-start bg-[#F9FAFB] p-4 rounded-lg"
        >
          <h1 className="text-[#3F622E] text-lg sm:text-xl font-bold">
            📱User-Friendly Interface
          </h1>
          <ul className="md:w-96 text-[#4F4F4F] text-start text-xs">
            <li className="flex gap-1 items-start">
              <span className="font-bold text-xl"> . </span>{" "}
              <p>
                Our intuitive platform is designed with you in mind. Whether
                you're a beginner or an experienced trader, you'll find it easy
                to use.
              </p>
            </li>
            <li className="flex gap-1 items-start">
              <span className="font-bold text-xl"> . </span>
              <p>
                Effortlessly navigate through your dashboard to initiate
                transfers, check your transaction history, and more.
              </p>
            </li>
          </ul>
        </MotionDiv>
      </div>
    </div>
  );
}

export default SectionWrapper(WhatWeOffer, "WhatWeOffer");
