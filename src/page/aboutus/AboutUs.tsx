import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";
import phoneImg from "../../assets/navbar/Tinaapp.svg";
import HeroBack from "../../assets/privacy/TinaAppimage.svg";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <main className="w-full overflow-x-hidden">
      <div className="w-full">
        <Navbar />
        <div
          className="py-32 w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: "url('/div.bg-gradient-to-r (2).svg')" }}
        >
          <div className="max-w-[78%] mx-auto flex flex-col items-center text-center max-[639px]:py-14 ">
            <h1 className="font-[400] text-[14px] leading-[40px] text-[#ACB79A] ">
              About us
            </h1>
            <p className="font-[500] text-[24px] leading-[24px] max-w-[584px] text-[#fff] max-[639px]:max-w-[400px] ">
              Empowering young Nigerians with a secure, accessible, and
              user-friendly platform to manage their finances and explore the
              world of cryptocurrencies with confidence.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="w-[95%] md:w-[78%] py-8 mx-auto flex text-sm flex-col gap-5 bg-white-100 ">
          <h1 className="font-[600] text-[36px] leading-[43.57px] ">
            Who we are
          </h1>
          <div className="flex gap-8 font-[300] text-[14px] leading-[24px] text-justify xs:flex xs:flex-col max-[639px]:flex max-[639px]:flex-col ">
            <div>
              <p>
                TinaPay is a Fintech and Exchange company that leverages on
                emerging technologies such as big data, artificial intelligence,
                blockchain and edge computing, to make financial services more
                accessible and efficient. In other words, TinaPay utilizes data
                from financial institutions and exchanges of digital currency,
                merges them in one collection for a fast and easy service.
              </p>
            </div>
            <div>
              <p>
                TinaPay is equally an exchange for your crypto assets as much as
                it is your mobile bank. In this light, there is an adoption of
                the U.S Dollars for price stability and regulation.{" "}
                <b className="font-[600]">Our Vision</b> is to become the
                leading all-in-one financial platform for young Nigerians,
                offering a secure, convenient, and affordable way to manage
                their finances and explore cryptocurrencies.
              </p>
            </div>
          </div>
          <div className="bg-[#4F7054] rounded-[10px] ">
            <p
              className="font-[500] text-[24px] leading-[29.05px] text-justify p-16 text-[#fff] max-[639px]:p-10 max-[639px]:text-[18px] "
              style={{ textAlign: "center" }}
            >
              TinaPay doesn’t just act as a bridge for your international
              transactions within the African space. TinaPay is your local bank
              as well, you can send money to your loved ones around you at
              little or no fees.
            </p>
          </div>
          <div className="max-w-[700px] mx-auto ">
            <p className="font-[300] text-[14px] leading-[24px] text-justify ">
              TinaPay brings digitalization to your doorstep. You can send your
              loved one money while taking a dump in the convenience. It’s swift
              like that. By pushing the transactional costs of financial
              services down, and relying entirely on digital access, TinaPay
              offers low-cost products and services that cater to these non-bank
              customers. Bringing effective financial services to these
              individuals, offers benefits to consumers and businesses alike
              <br /> <br />
              Ultimately, the goal of TinaPay is to make financial services less
              expensive and more flexible per transaction. The greatest promise
              potentially lies in reaching the so-called unbanked and
              underbanked.
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#677D4B] to-[#4F7054] w-full">
          <div className="rounded-lg mx-auto flex gap-24 max-[639px]:flex-col max-[639px]:flex max-[639px]:gap-0 ">
            <div className="flex-1 max-[639px]:hidden ">
              <img className=" object-cover" src={phoneImg} alt="" />
            </div>
            <div className="flex-1 sm:hidden md:hidden lg:hidden xl:hidden max-[639px]:block ">
              <img className="w-full" src={HeroBack} alt="" />
            </div>
            <div className="flex-1 flex flex-col gap-4 items-start py-12 max-[639px]:gap-0 max-[639px]:items-center ">
              <div className="flex flex-col justify-start items-start gap-8 max-[639px]:pr-0 max-[639px]:items-center max-[639px]:justify-center ">
                <h1 className="text-[#fff] text-[36px] font-[500] leading-[40px] max-w-[322px] max-[639px]:text-center ">
                  <span className="text-[#F2E2A5] ">Easily</span> Send, Receive
                  and Convert your Digital Assets
                </h1>
                <p className=" text-justify text-[14px] font-[400] leading-[16px] text-[#FFFFFF] max-w-[322px] max-[639px]:text-center  ">
                  With TinaPay, you can easily send and receive money, save in
                  crypto, pay bills and covert your giftcard and
                  cryptocurrencies to cash.
                </p>
                <Link to={"/dashboard"}>
                  <button className="rounded-md bg-[#F2E2A5] px-6 py-2 ">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default AboutUs;
