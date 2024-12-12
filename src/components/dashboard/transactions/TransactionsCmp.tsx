/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavLink } from "react-router-dom";
import IconRed from "../../../assets/dashboard/transaction/icon.svg";
import IconGreen from "../../../assets/dashboard/transaction/icon_green.svg";
import NoData from "../../../assets/dashboard/transaction/nodata.svg";

export default function TransactionsCmp({ data }: any) {
  // console.log(data);

  if (!data || data.length == 0) {
    return (
      <div className="w-full p-2 md:p-5 h-[40vh] lg:min-h-screen flex flex-col gap-5 items-center justify-center">
        <img src={NoData} alt="" />
        <h1>You are yet to complete a Transaction</h1>
      </div>
    );
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString(); // You can customize the formatting as needed
  }

  return (
    <div className="w-full p-2 lg:min-h-screen flex flex-col gap-2">
      {/* transaction  card */}
      {data?.map((item: any, index: number) => (
        <NavLink
          to={"/transactions/detail"}
          state={item}
          key={index}
          className="flex justify-between hover:bg-gray-50 items-center text-sm border-b p-2 md:p-4"
        >
          <div className="flex items-center gap-2">
            {item?.debit_credit?.toLowerCase() == "debit" ? (
              <img src={IconRed} alt="" />
            ) : (
              <img src={IconGreen} alt="" />
            )}
            <div>
              {String(item?.transaction_origin)?.toLowerCase() ==
                "ethereum Deposit".toLowerCase() ||
              String(item?.transaction_origin)?.toLowerCase() ==
                "bitcoin Deposit".toLowerCase() ? (
                <h1 className="capitalize">{item?.transaction_origin}</h1>
              ) : (
                <h1>
                  {item?.beneficiary_account_name} -
                  <span className="text-[#9e9e9e]">
                    {" "}
                    {item?.transaction_origin}
                  </span>
                </h1>
              )}
              <h1 className="font-light text-[#AB9C9C]">
                {formatDate(item?.transaction_date)}
              </h1>
            </div>
          </div>
          {/* amount charge */}
          <h1>
            {" "}
            <span>
              {item?.debit_credit?.toLowerCase() == "debit" ? "-" : "+"}
            </span>{" "}
            {item?.currency == "USD" &&
              ` $ ${Number(item?.transaction_amount).toFixed(3)}`}
            {item?.currency == "NGN" &&
              ` NGN ${Number(item?.transaction_amount).toFixed(3)}`}
          </h1>
        </NavLink>
      ))}
    </div>
  );
}
