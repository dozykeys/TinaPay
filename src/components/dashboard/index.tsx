import { FaChevronDown } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import usdtIcon from "../../assets/dashboard/main/usdtIcon.svg";
import DashboardAction from "./main/DashboardAction";
import QuickAction from "./main/QuickAction";
import SliderDashboard from "./main/SliderDashboard";
import { useContext, useState } from "react";
import { UserData } from "../../context/userDataContext";
import TransactionsCmp from "./transactions/TransactionsCmp";
import { NavLink } from "react-router-dom";
// import Side from "./Side/Side";
// import { useNavigate } from "react-router-dom";

export default function MainDashBoard() {
  const { walletBal, recentTrans } = useContext(UserData);
  const [hideBal, setHideBal] = useState(false);

  // const { userInfo } = useContext(UserData);

  // // console.log({ userInfo });

  // const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!userInfo) {
  //       navigate("/auth/onboarding");
  //     }
  //   }, 15000);
  // }, []);

  return (
    <div className="w-full bg-white-100 mb-32 md:mb-0 md:py-5 lg:min-h-screen">
      <div className="w-[95%] md:w-[90%] mx-auto space-y-7">
        <div className="w-full mx-auto flex items-center justify-between text-black-100 md:border rounded-xl py-5 px-5 md:px-10">
          {/* avaliable balance */}
          <div className="flex-col">
            <p className="flex gap-2 items-center text-[#4F4F4F]">
              <h1> Available balance </h1>
              <span>
                {!hideBal ? (
                  <FiEye
                    onClick={() => setHideBal(true)}
                    size={23}
                    className="text-xl cursor-pointer"
                  />
                ) : (
                  <FiEyeOff
                    onClick={() => setHideBal(false)}
                    size={23}
                    className="text-xl cursor-pointer"
                  />
                )}
              </span>
            </p>
            {walletBal?.amount >= 0 && hideBal ? (
              <h1 className="font-bold text-2xl">* * * *</h1>
            ) : (
              <h1 className="font-bold text-2xl">
                {walletBal?.amount >= 0 ? (
                  <>$ {walletBal?.amount} </>
                ) : (
                  <NavLink
                    className="text-lg text-tinaColor underline underline-offset-2"
                    to={"/auth/onboarding"}
                  >
                    complete onboarding
                  </NavLink>
                )}
              </h1>
            )}
          </div>

          {/* usdt symbols */}
          <div className="flex items-center gap-1">
            <img src={usdtIcon} width={40} alt="" />
            <p className="flex gap-2 items-center text-[#4F4F4F] font-semibold">
              USDT
            </p>

            <FaChevronDown />
          </div>
        </div>

        {/* actions */}
        <DashboardAction />

        {/* slider */}
        <SliderDashboard />

        {/* quick action */}

        <QuickAction />

        {/* recent transactions */}

        <div className="w-full block lg:hidden bg-[#F9FAFB] p-2 md:p-5 space-y-1 md:space-y-3 lg:min-h-screen">
          {/* title */}
          <div className="flex w-full justify-between items-center">
            <h1 className="font-medium md:font-semibold text-lg">
              Recent Transaction
            </h1>
            <button>View all</button>
          </div>
          <div className="w-full bg-white rounded-lg mx-auto space-y-7">
            <TransactionsCmp data={recentTrans} />
          </div>
        </div>
      </div>
    </div>
  );
}
