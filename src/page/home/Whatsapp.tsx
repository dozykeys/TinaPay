import serviceImg from "../../assets/dashboard/support/service.png";
import TopNavbar from "../../components/shared/Navbar/TopNavbar";

export default function EmailUs() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+2348058074322', '_blank');
  };

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Email Us"} />
      {/* The main whatsapp */}
      <div className="w-full flex flex-col gap-7 items-center justify-center">
        <img src={serviceImg} alt="" />
        <div className="font-semibold text-lg text-center">
          <h1>Hi,</h1>
          <h1>How may we be of service today.</h1>
        </div>
        <p className="text-center text-lg">
          Send us a message on whatsapp, stating your Issue , and we will respond to you as
          soon as Possible click on Whatsapp Us
        </p>
        <a
          href=""
          onClick={handleWhatsAppClick}
          className="p-4 cursor-pointer bg-[#f8f0e5] font-semibold text-tinaColor"
        >
          Whatsapp Us
        </a>
      </div>
    </div>
  );
}
