import hero from "../../../assets/home/hero.png";
import grp from "../../../assets/home/grp.png";
import grp1 from "../../../assets/home/grp1.png";
import grp2 from "../../../assets/home/grp2.png";

export default function Hero() {
  return (
    <div className="flex flex-col text-sm justify-center gap-2 pt-36 pb-2 text-white">
      <div className="md:w-5/6 w-[90%] mx-auto flex flex-col gap-2 items-center text-center">
        <h1 className="md:w-4/5 text-center font-bold text-2xl md:text-4xl ">
          Contact Us
        </h1>

        <p className="mt-2 text-xs">
          Get in Touch with Us Today for Quick and Friendly Assistance!
        </p>

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
