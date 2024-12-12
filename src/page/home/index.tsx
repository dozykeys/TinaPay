import { useContext, useEffect } from "react";
import { Helmet } from 'react-helmet';
import AppStore from "../../components/landingPage/AppStore/AppStore";
import CTA from "../../components/landingPage/CTA/CTA";
import Hero from "../../components/landingPage/Hero/Hero";
import Rates from "../../components/landingPage/Rates/Rates";
import WhatWeOffer from "../../components/landingPage/WhatWeOffer/WhatWeOffer";
import WhyChooseUs from "../../components/landingPage/WhyChooseUs/WhyChooseUs";
import Footer from "../../components/shared/Footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";
import { UserData } from "../../context/userDataContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(UserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <main className="flex min-h-screen gap-10 flex-col items-center justify-between">
      {/* <div className="bg-gradient-to-r from-[#677D4B] to-[#5B6744] w-full"> */}
      <Helmet>
        <title>TinaPay - Easily Manage Your Digital Assets</title>
        <meta name="description" content="With TinaPay, you can easily send and receive money, save in crypto, pay bills and convert your giftcard and cryptocurrencies to cash." />
        <meta name="keywords" content="TinaPay, cryptocurrency, send money, receive money, pay bills, convert giftcard, digital assets" />
        <meta name="author" content="TinaPay" />
      </Helmet>
      <div className="bg-gradient-to-r from-[#677D4B]  to-[#4F7054] w-full">
        <Navbar />
        <Hero />
      </div>
      <WhatWeOffer />
      <Rates />
      <CTA />
      <WhyChooseUs />
      <AppStore />
      <Footer />
    </main>
  );
}
