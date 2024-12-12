import DataMain from "../../../../components/dashboard/Bills/Data/DataMain";
import TopNavbar from "../../../../components/shared/Navbar/TopNavbar";

export default function DataBills() {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Data"} />
      <DataMain />
    </div>
  );
}
