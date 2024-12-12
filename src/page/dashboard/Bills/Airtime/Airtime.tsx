import AirtimeMain from "../../../../components/dashboard/Bills/Airtime/AirtimeMain";
import TopNavbar from "../../../../components/shared/Navbar/TopNavbar";

export default function Airtime() {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Airtime"} />
      <AirtimeMain />
    </div>
  );
}
