import FeedbackForm from "../../components/feedback/Form/FeedbackForm";
import Hero from "../../components/feedback/Hero/Hero";
import Footer from "../../components/shared/Footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";

const Feedback = () => {
  return (
    <main className="flex min-h-screen gap-10 flex-col items-center justify-between">
      {/* <div className="bg-gradient-to-r from-[#677D4B] to-[#5B6744] w-full"> */}
      <div className="bg-gradient-to-r from-[#677D4B]  to-[#4F7054] w-full">
        <Navbar />
        <Hero />
      </div>
      <FeedbackForm />

      <Footer />
    </main>
  );
};

export default Feedback;
