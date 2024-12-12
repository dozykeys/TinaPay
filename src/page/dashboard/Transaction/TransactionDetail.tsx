import { useLocation } from "react-router-dom";
import TrxDetailCMP from "../../../components/dashboard/transactions/trxDetailCMP";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import TrxDetailEletric from "../../../components/dashboard/transactions/trxDetailElectric";

export default function TransactionDetail() {
  let { state: data } = useLocation();

  console.log({ data });

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5  bg-white-100 py-5">
      <TopNavbar name={"Transactions Detail"} />

      {String(data?.transaction_origin).toLowerCase() == "electricity" ? (
        <TrxDetailEletric data={data} />
      ) : (
        <TrxDetailCMP data={data} />
      )}
    </div>
  );
}
