import { useContext } from "react";
import { UserData } from "../../../context/userDataContext";
import TransactionsCmp from "../transactions/TransactionsCmp";
import NotificationCmp from "../Notification/NotificationCmp";

export default function Side() {
  const { recentTrans, notiToggle } = useContext(UserData);

  return (
    <div className="w-full bg-[#F9FAFB] p-2 md:p-5 space-y-1 md:space-y-3 lg:min-h-screen">
      {/* title */}
      <div className="flex w-full justify-between items-center">
        <h1 className="font-medium md:font-semibold text-lg">
          Recent Transaction
        </h1>
        <button>View all</button>
      </div>
      <div className="w-full bg-white rounded-lg mx-auto space-y-7">
        {!notiToggle && <TransactionsCmp data={recentTrans} />}
        {notiToggle && <NotificationCmp />}
      </div>
    </div>
  );
}
