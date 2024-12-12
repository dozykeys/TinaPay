import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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

export default function TrxDetailCMP({ data }: ITransaction) {
  const navigate = useNavigate();

  console.log({ data });

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5  bg-white-100 py-5">
      <div className="w-full flex justify-end">
        <IoCloseSharp
          className="cursor-pointer text-red-500"
          onClick={() => navigate(-1)}
          size={25}
        />
      </div>

      <div className="bg-[#f8f0e5] p-5 rounded-xl text-center text-xl">
        <h2>Amount</h2>
        <h2 className="font-bold">${data?.transaction_amount.toFixed(2)}</h2>
      </div>

      <div className="w-full border-t-8 rounded-t-lg border-[#008000] bg-[#f8f8f8]">
        {/* sender */}
        <div className="w-full p-3">
          <div className="flex pb-2 justify-between">
            <h1>Sender:</h1>
            <h1>{data?.sender_name}</h1>
          </div>
          <hr className="w-[98%] mx-auto block" />
        </div>

        {/* Beneficiary */}
        <div className="w-full p-3">
          <div className="flex pb-2 justify-between">
            <h1>Beneficiary:</h1>
            <h1>{data?.beneficiary_account_name}</h1>
          </div>
          <hr className="w-[98%] mx-auto block" />
        </div>

        {/* Transaction date */}
        <div className="w-full p-3">
          <div className="flex pb-2 justify-between">
            <h1>Transaction date::</h1>
            <h1>{formatDateTime(data?.transaction_date)}</h1>
          </div>
          <hr className="w-[98%] mx-auto block" />
        </div>

        {/* Transaction ref */}
        <div className="w-full p-3">
          <div className="flex pb-2 justify-between">
            <h1>Transaction ref:</h1>
            <h1>{data?.transaction_ref}</h1>
          </div>
          <hr className="w-[98%] mx-auto block" />
        </div>

        {/* Transaction type */}
        <div className="w-full p-3">
          <div className="flex pb-2 justify-between">
            <h1>Transaction type:</h1>
            <h1>{data?.transaction_type}</h1>
          </div>
          <hr className="w-[98%] mx-auto block" />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-green font-semibold rounded-lg text-white p-4 w-full"
        >
          BACK
        </button>
      </div>
    </div>
  );
}
