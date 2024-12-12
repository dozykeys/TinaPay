/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import { supabase } from "../../../constants/supabase";
import { UserData } from "../../../context/userDataContext";
import { useQuery } from "react-query";
import moment from "moment"; // Import moment library
import IconRed from "../../../assets/dashboard/transaction/icon.svg";
import IconGreen from "../../../assets/dashboard/transaction/icon_green.svg";
import NoData from "../../../assets/dashboard/transaction/nodata.svg";
import { NavLink } from "react-router-dom";

export default function Transaction() {
  const { user } = useContext(UserData);
  const [selectedMonth, setSelectedMonth] = useState<moment.Moment | null>(
    null
  ); // Explicitly define type
  const [currentPage, setCurrentPage] = useState<number>(1); // Explicitly define type
  const itemsPerPage: number = 10; // Number of items per page

  const { data: transData, isLoading } = useQuery(
    ["getTransactions", selectedMonth, currentPage],
    async () => {
      let query = supabase
        .from("transactions")
        .select("*")
        .eq("user_id_fk", user?.id);

      if (selectedMonth) {
        // Filter transactions by selected month
        query = query
          .gte("transaction_date", selectedMonth.startOf("month").toISOString())
          .lte("transaction_date", selectedMonth.endOf("month").toISOString());
      }

      const { data } = await query
        .order("created_at", { ascending: false })
        .range(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage - 1
        );
      return data;
    }
  );

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = event.target.value; // Month number as string
    const monthMoment = moment().month(parseInt(selectedMonth) - 1); // Create moment object for selected month
    setSelectedMonth(monthMoment); // Set selected month
    setCurrentPage(1); // Reset current page when changing month
  };

  const totalPages: number = Math.ceil((transData?.length || 0) / itemsPerPage);

  if (!transData) {
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

  function getMonthName(monthNumber: any) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1];
  }

  // Group transactions by day
  const groupedTransactions: { [key: string]: any[] } = {};
  transData.forEach((item: any) => {
    const date = moment(item.transaction_date).format("YYYY-MM-DD");
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [];
    }
    groupedTransactions[date].push(item);
  });

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 pb-10 bg-white-100 py-5">
      <TopNavbar name={"Transactions"} />

      <select className="hidden" onChange={handleMonthChange}>
        <option value="">All Months</option>
        {Array.from({ length: 12 }, (_, index) => {
          const month = index + 1;
          return (
            <option key={month} value={month}>
              {getMonthName(month)}
            </option>
          );
        })}
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date} className="mb-4">
              <h2 className="text-lg font-bold">
                {moment(date).format("MMMM D, YYYY")}
              </h2>
              {transactions.map((item: any, index: number) => (
                <NavLink
                  to={"/transactions/detail"}
                  state={item}
                  key={index}
                  className="w-full flex justify-between items-center text-sm border-b p-2 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    {item?.debit_credit.toLowerCase() == "debit" ? (
                      <img src={IconGreen} alt="" />
                    ) : (
                      <img src={IconRed} alt="" />
                    )}
                    <div>
                      {String(item?.transaction_origin).toLowerCase() ==
                        "ethereum Deposit".toLowerCase() ||
                      String(item?.transaction_origin).toLowerCase() ==
                        "bitcoin Deposit".toLowerCase() ? (
                        <h1 className="capitalize">
                          {item?.transaction_origin}
                        </h1>
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
                      {item?.debit_credit.toLowerCase() == "debit" ? "-" : "+"}
                    </span>{" "}
                    {item?.currency == "USD" &&
                      ` $ ${Number(item?.transaction_amount).toFixed(3)}`}
                    {item?.currency == "NGN" &&
                      ` NGN ${Number(item?.transaction_amount).toFixed(3)}`}
                  </h1>
                </NavLink>
              ))}
            </div>
          ))}

          <div>
            {/* Pagination controls */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                className="px-4 py-2 bg-tinaColor text-white rounded"
                key={i}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
