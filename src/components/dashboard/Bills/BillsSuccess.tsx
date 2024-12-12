import { Link } from "react-router-dom";
import successImg from "../../../assets/dashboard/bills/success.svg";

export default function BillsSuccess() {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm items-center justify-center min-h-[70vh] my-auto flex-col gap-5 bg-white-100 py-5">
      <img src={successImg} />

      <h1 className="text-xl font-bold">Purchase Successful</h1>

      <Link
        to={"/dashboard"}
        className="bg-green cursor-pointer hover:opacity-85 text-white py-4 px-28 md:px-60"
      >
        OKAY
      </Link>
    </div>
  );
}
