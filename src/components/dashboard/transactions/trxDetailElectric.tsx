import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../constants/supabase";
import checkSvg from "../../../assets/dashboard/transaction/check.svg";

interface ITransaction {
  data: {
    beneficiary_account_name: string;
    beneficiary_account_number: string | null;
    beneficiary_bank_name: string | null;
    charges: number | null;
    created_at: string;
    currency: string;
    debit_credit: string;
    id: number;
    receiver_user_id_fk: string | null;
    sender_email: string | null;
    sender_name: string;
    sender_phone: string | null;
    transaction_amount: number;
    transaction_date: string;
    transaction_origin: string;
    transaction_ref: string;
    transaction_status: string;
    transaction_type: string;
    user_id_fk: string;
    wallet_address: string | null;
    wallet_type: string | null;
  };
}

function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate: string = date.toLocaleString("en-US", options);
  return formattedDate
    .replace(/(\d{1,2})(st|nd|rd|th)/, "$1<sup>$2</sup>")
    .replace(",", "");
}

export default function TrxDetailEletric({ data }: ITransaction) {
  const navigate = useNavigate();

  // console.log({ data });

  const { data: electricTrx } = useQuery(["getElectricData"], async () => {
    const { data: data1, error } = await supabase
      .from("electricity_logs")
      .select("*")
      .eq("orderId", data.transaction_ref);

    if (error) {
      throw new Error(error.message);
    }

    return data1[0];
  });

  // console.log({ electricTrx });

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5  bg-white-100 py-5">
      <div className="w-full flex justify-center">
        <h1>Pay Electricity Bill</h1>
      </div>

      <div className="w-full border-t-8 rounded-t-lg border-[#008000] bg-[#f8f8f8]">
        <div className="pt-4 flex w-full flex-col items-center mx-auto gap-2">
          <img src={checkSvg} />
          <h1 className="text-tinaColor">Successful</h1>
        </div>

        {/* DISCO */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>DISCO</h1>
            <h1 className="w-1/2 text-right text-xs font-bold">
              {electricTrx?.disco} Electricity
            </h1>
          </div>
        </div>

        {/* TOKEN */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>TOKEN</h1>
            <h1 className="w-1/2 text-right text-xs font-bold">
              {electricTrx?.token}
            </h1>
          </div>
        </div>

        {/* header */}

        <div className="w-full p-2">
          <div className="flex justify-center font-bold text-lg py-2">
            <h1>Transaction Details</h1>
          </div>
        </div>

        {/* AMOUNT */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>AMOUNT</h1>
            <h1 className="w-1/2 text-right text-xs font-bold">
              {electricTrx?.totalAmountPaid}
            </h1>
          </div>
        </div>

        {/* METER NUMBER */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>METER NUMBER</h1>
            <h1 className="w-1/2 text-right text-xs font-bold">
              {electricTrx?.transaction_ref}
            </h1>
          </div>
        </div>

        {/* NAME */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>NAME</h1>
            <h1 className="w-1/2 text-right text-xs font-bold">
              {electricTrx?.name}
            </h1>
          </div>
        </div>

        {/* METER TYPE */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>METER TYPE</h1>
            <h1>Prepaid</h1>
          </div>
        </div>

        {/* PHONE */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>PHONE</h1>
            <h1 className="w-1/2 text-right text-xs font-bold">
              {electricTrx?.phoneNo}
            </h1>
          </div>
        </div>

        {/* OUTSTANDING */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>OUTSTANDING</h1>
            <h1 className="w-1/2 text-right text-xs font-bold">0.00</h1>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>ADDRESS</h1>
            <h1 className="w-1/2 text-right text-xs font-bold">
              {electricTrx?.address}
            </h1>
          </div>
        </div>

        {/* TRANSACTION NUMBER */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>TRANSACTION NUMBER</h1>
            <h1 className="w-1/2 text-right text-xs font-bold">
              {electricTrx?.orderId}
            </h1>
          </div>
        </div>

        {/* TRANSACTION DATE */}
        <div className="w-full p-2">
          <div className="flex justify-between">
            <h1>TRANSACTION DATE</h1>
            <h1 className="w-1/2 text-right text-xs font-bold">
              {formatDateTime(electricTrx?.created_at)}
            </h1>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-green font-semibold rounded-lg text-white p-4 w-full"
        >
          OK
        </button>
      </div>
    </div>
  );
}
