import ContactUsForm from "../../components/Contactus/Form/ContactUsForm";
import Hero from "../../components/Contactus/Hero/Hero";
import Footer from "../../components/shared/Footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";

const ContactUs = () => {
  return (
    <main className="flex min-h-screen gap-10 flex-col items-center justify-between">
      {/* <div className="bg-gradient-to-r from-[#677D4B] to-[#5B6744] w-full"> */}
      <div className="bg-gradient-to-r from-[#677D4B]  to-[#4F7054] w-full">
        <Navbar />
        <Hero />
      </div>
      <ContactUsForm />

      <Footer />
    </main>
  );
};

export default ContactUs;
