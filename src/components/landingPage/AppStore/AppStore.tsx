import googlePlay from "../../../assets/home/google_play.svg";
import app_store from "../../../assets/home/app_store.svg";
import { SectionWrapper } from "../../../hoc";

function AppStore() {
  return (
    <div className="w-[90%] mx-auto flex flex-col justify-center gap-5 items-center text-center">
      <div className="w-full mx-auto flex flex-col items-center  text-white bg-[#161503] rounded-lg py-10 px-2 sm:px-5 md:px-20">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-5 leading-tight md:w-2/3 text-center">
          Download the Tinapay App & Get{" "}
          <span className="text-[#FCECAF]">Started Now!</span>
        </h2>
        <div className="w-full flex justify-center gap-2 mt-2 md:mt-5">
          <a
            href="https://play.google.com/store/apps/details?id=com.tinapay&pcampaignid=web_share"
            target="_blank"
            className="cursor-pointer"
          >
            <img
              src={googlePlay}
              width={120}
              className="responsive-img"
              alt=""
            />
          </a>
          <a
            href="https://apps.apple.com/us/app/tinapay/id6473535794"
            className="cursor-pointer"
            target="blank_"
          >
            <img
              src={app_store}
              width={120}
              className="responsive-img"
              alt=""
            />
          </a>

        </div>
      </div>
    </div>
  );
}

export default SectionWrapper(AppStore, "WhyChooseUs");
