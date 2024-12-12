import billsIcon from "../../../assets/dashboard/main/billsIcon.svg";
import sendIcon from "../../../assets/dashboard/main/sendIcon.svg";
import plusIcon from "../../../assets/dashboard/main/plusIcon.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserData } from "../../../context/userDataContext";

export default function QuickAction() {
  const { userInfo } = useContext(UserData);
  return (
    <>
      <h1 className="w-full -my-5">Quick Actions</h1>
      <div className="w-full grid grid-cols-3 gap-2 lg:gap-3">
        <NavLink
          to={!userInfo?.user_id_fk ? "/auth/onboarding" : "/topup_crypto_menu"}
          className="bg-[#D8EFF3] lg:p-4 p-2 flex lg:flex-row flex-col items-center gap-3 md:gap-2 rounded-xl lg:justify-between"
        >
          <img src={plusIcon} width={25} alt="" />
          <div className="space-y-1 text-center lg:text-start">
            <h1 className="font-semibold text-[#161503] lg:text-lg">
              My Wallet
            </h1>
            <p className="text-xs text-neutral-900">
              View the current and accurate crypto rates.
            </p>
          </div>
        </NavLink>
        <NavLink
          to={!userInfo?.user_id_fk ? "/auth/onboarding" : "/rate"}
          className="bg-[#EEF2EC] lg:p-4 p-2 flex lg:flex-row flex-col items-center gap-3 md:gap-2 rounded-xl lg:justify-between"
        >
          <img src={sendIcon} width={25} alt="" />
          <div className="space-y-1 text-center lg:text-start">
            <h1 className="font-semibold text-[#161503] lg:text-lg">
              Crypto Rates
            </h1>
            <p className="text-xs text-neutral-900">
              See an overview of your cards and wallet.
            </p>
          </div>
        </NavLink>
        <NavLink
          to={!userInfo?.user_id_fk ? "/auth/onboarding" : "/subscriptions"}
          className="bg-[#E0EAFF]  lg:p-4 p-2 flex lg:flex-row flex-col items-center gap-3 md:gap-2 rounded-xl lg:justify-between"
        >
          <img src={billsIcon} width={25} alt="" />
          <div className="space-y-1 text-center lg:text-start">
            <h1 className="font-semibold text-[#161503] lg:text-lg">
              Gift Cards & Subscriptions
            </h1>
            <p className="text-xs text-neutral-900">View various services.</p>
          </div>
        </NavLink>
      </div>
    </>
  );
}
