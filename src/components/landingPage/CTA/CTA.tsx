import { Link } from "react-router-dom";
import ctaImg from "../../../assets/home/cta.svg";
import { SectionWrapper } from "../../../hoc";
import { MotionDiv } from "../../../utils/Motion";

function CTA() {
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
    <div className="w-full  mx-auto flex flex-col justify-center gap-5 items-center text-center">
      <div className="bg-[#3F622E]  lg:w-2/3 w-[95%] flex gap-5 flex-col md:flex-row mx-auto rounded-md py-5 px-2 md:p-10">
        <img src={ctaImg} alt="ctaImg" className="mx-auto" width={300} />

        <MotionDiv
          variants={scaleVariants}
          whileInView={scaleVariants.whileInView}
          className="flex flex-col text-white text-start gap-2"
        >
          <h1 className="text-3xl font-bold">
            Your Crypto, Your Wallet, Your Security
          </h1>
          <p className="text-xs md:text-sm text-justify">
            We empower you to take control of your crypto assets like never
            before. With our platform, you can effortlessly create your own
            secure wallet for all your cryptocurrency holdings.
          </p>

          <div className="bg-[#F9FAFB] rounded-md p-2 md:p-4">
            <h1 className="text-primary font-semibold">✌🏽Peace of Mind</h1>
            <ul className="md:w-96 w-full space-y-3 text-[#4F4F4F] text-start text-xs">
              <li className="flex gap-1 items-start">
                <span className="font-bold text-xl"> . </span>
                <p>
                  Enjoy peace of mind knowing that your crypto assets are safe
                  and easily accessible.
                </p>
              </li>
              <li className="flex gap-1 items-start">
                <span className="font-bold text-xl"> . </span>
                <p>
                  It's your crypto journey, and we're here to make it secure and
                  convenient. Get Started
                </p>
              </li>
            </ul>
          </div>

          <div className="w-4/5 text-start mt-4">
            <Link
              to={"/auth/signup"}
              className="p-2 bg-[#F2E2A5] w-fit text-sm hover:opacity-85 cursor-pointer text-primary rounded px-6"
            >
              Get Started
            </Link>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}

export default SectionWrapper(CTA, "CTA");
