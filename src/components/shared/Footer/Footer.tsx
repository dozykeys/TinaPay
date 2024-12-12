import logo from "../../../assets/home/logo.png";
import googlePlayImage from "../../../assets/home/google_play1.svg";
import appStoreImage from "../../../assets/home/app_store.svg";
import twitterImage from "../../../assets/home/tw.png";
import facebookImage from "../../../assets/home/fb.png";
import instagramImage from "../../../assets/home/ig.png";
import youtubeImage from "../../../assets/home/yt.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full bg-[#030303] py-10">
      <div className="flex flex-col md:flex-row gap-3 md:px-0 w-[90%] md:w-4/5 justify-between mx-auto">
        <Link to={"/"} className="mx-auto md:mx-0">
          <img src={logo} className="responsive-img" alt="" />
        </Link>

        <div className="col s12 m3 text-white bg-[#030303]">
          <h4 className="font-bold mb-5 text-xl">Features</h4>
          <div className="mt-5 font-light text-xs space-y-3">
            <p>Send Crypto</p>
            <p>Receive Crypto</p>
            <p>Convert to Local Currencies</p>
            <p>Send To Local Banks</p>
            <p>Received In Local Currencies</p>
            <p>Pay Bills</p>
            <p>Save And Invest</p>
          </div>
        </div>

        <div className="col s12 m3 text-white bg-[#030303]">
          <h4 className="font-bold mb-5 text-xl">Company</h4>
          <div className="mt-5 font-light text-xs space-y-3">
            <p>
              <Link to="/aboutus" className="text-white">
                About
              </Link>
            </p>
            <p>Blog</p>
            <p>
              <Link to="../faq" className="text-white">
                FAQs
              </Link>
            </p>
          </div>

          <h4 className="font-bold mt-5 text-xl">Legal</h4>
          <div className="mt-5 font-light text-xs space-y-3">
            <p>
              <Link to="/privacy_policy" className="text-white">
                Privacy Policy
              </Link>
            </p>
            <p>
              <Link to="../terms_of_service" className="text-white">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>

        <div className="col s12 m3 text-white bg-[#030303] mb-10">
          <h4 className="font-bold mb-5 text-xl">Contact Us</h4>
          <div className="mt-5">
            <div className="mb-2 font-light text-xs space-y-3">
              <Link to={"/feedback"}>Send a feedback </Link>
              <br />
              <a href="mailto:support@tinapay.co">support@tinapay.co</a>
            </div>
            <div className="flex gap-2">
              <a href="https://twitter.com/TinaPayapp" target="_blank">
                <img src={twitterImage} className="responsive-img" alt="" />
              </a>
              <a href="https://web.facebook.com/tinapayapp" target="_blank">
                <img src={facebookImage} className="responsive-img" alt="" />
              </a>
              <a href="https://www.instagram.com/tinapayapp/" target="_blank">
                <img src={instagramImage} className="responsive-img" alt="" />
              </a>
              <a href="" target="_blank">
                <img src={youtubeImage} className="responsive-img" alt="" />
              </a>
            </div>
            <div className="mt-8 space-y-2">
              <a href="https://play.google.com/store/apps/details?id=com.tinapay&pcampaignid=web_share">
                <img src={googlePlayImage} alt="" />
              </a>
              <a
                href="https://apps.apple.com/us/app/tinapay/id6473535794"
                target="blank_"
              >
                <img src={appStoreImage} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="md:w-2/3 w-5/6 mx-auto bg-[#030303] text-white md:hidden flex font-light text-xs">
        © 2023 TP Technology Ltd. All rights reserved.
      </p>

      {/* divider */}
      <div className="h-[1px] my-5 md:my-10 bg-white md:w-2/3 w-5/6 mx-auto"></div>

      <div className="md:w-2/3 w-5/6 mx-auto bg-[#030303] flex flex-col md:flex-row items-center justify-between gap-2 font-light text-xs space-y-3">
        <p className="text-white hidden md:flex">
          © 2023 TP Technology Ltd. All rights reserved.
        </p>

        <p className="text-white md:w-2/3 pr-14 w-full text-justify">
          TinaPay is a leading crypto app that offers a user-friendly platform
          for managing your digital assets. We've built a reputation for
          providing fast, secure, and easy-to-use services to our customers.
        </p>
      </div>
    </div>
  );
}
