import billsIcon from "../../../assets/dashboard/main/billsIcon.svg";
import sendIcon from "../../../assets/dashboard/main/sendIcon.svg";
import plusIcon from "../../../assets/dashboard/main/plusIcon.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserData } from "../../../context/userDataContext";

export default function DashboardAction() {
  const { userInfo } = useContext(UserData);
  return (
    <div className="md:w-full w-[90%] mx-auto grid grid-cols-3 gap-1 md:gap-5">
      <Link
        to={!userInfo?.user_id_fk ? "/auth/onboarding" : "/topup"}
        className="bg-neutral-50 p-3 lg:p-5 flex flex-col gap-2 rounded-xl justify-center items-center"
      >
        <img src={plusIcon} className="w-6 lg:w-8" alt="" />
        <p>Top-up</p>
      </Link>
      <Link
        to={!userInfo?.user_id_fk ? "/auth/onboarding" : "/transfer"}
        className="bg-neutral-50 p-3 lg:p-5 flex flex-col gap-2 rounded-xl justify-center items-center"
      >
        <img src={sendIcon} className="w-6 lg:w-8" alt="" />
        <p>Transfer</p>
      </Link>
      <Link
        to={!userInfo?.user_id_fk ? "/auth/onboarding" : "/bills"}
        className="bg-neutral-50 p-3 lg:p-5 flex flex-col gap-2 rounded-xl justify-center items-center"
      >
        <img src={billsIcon} className="w-6 lg:w-8" alt="" />
        <p>Bills</p>
      </Link>
    </div>
  );
}
