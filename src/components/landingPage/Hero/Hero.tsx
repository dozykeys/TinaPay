import hero from "../../../assets/home/hero.png";
import grp from "../../../assets/home/grp.png";
import grp1 from "../../../assets/home/grp1.png";
import grp2 from "../../../assets/home/grp2.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex flex-col text-sm justify-center gap-2 pt-36 pb-2 text-white">
      <div className="md:w-5/6 w-[90%] mx-auto flex flex-col gap-2 items-center text-center">
        <h1 className="md:w-4/5 text-center font-bold text-2xl md:text-4xl ">
          Experience <span className="text-[#F2E2A5]">Next Level</span> Solution
          For Your Digital <span className="text-[#F2E2A5]">Payments.</span>
        </h1>

        <p className="mt-2 text-xs">
          Securely Send, receive and convert digital assets seamlessly across
          borders on TinaPay. It’s swift like that.
        </p>
        <div className="w-4/5 text-center mt-4">
          <Link
            to={"/auth/signup"}
            className="p-2 bg-[#F2E2A5] w-fit hover:opacity-85 cursor-pointer text-primary rounded px-6"
          >
            Get Started
          </Link>
        </div>
        {/* extra images */}
        <div className="md:-mt-10 lg:-mt-24 w-full mx-auto md:mx-20 flex justify-center md:justify-between">
          <img src={hero} alt="hero" width={300} />
          <div className="hidden md:flex flex-col gap-10 -mt-24">
            <img
              src={grp}
              alt="grp"
              width={50}
              className="transform scale-x-[-1]"
            />
            <img src={grp1} alt="grp1" width={100} />
            <img
              src={grp2}
              alt="grp2"
              width={100}
              className="-ml-40 transform scale-x-[-1] -rotate-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
