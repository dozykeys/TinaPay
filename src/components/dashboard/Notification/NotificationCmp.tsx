/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavLink } from "react-router-dom";
import NoData from "../../../assets/dashboard/transaction/nodata.svg";
import { useContext } from "react";
import { UserData } from "../../../context/userDataContext";

export default function NotificationCmp() {
  // console.log(data);

  const { notification: data } = useContext(UserData);

  if (!data || data.length == 0) {
    return (
      <div className="w-full p-2 md:p-5 h-[40vh] lg:min-h-screen flex flex-col gap-5 items-center justify-center">
        <img src={NoData} alt="" />
        <h1>No notification avaliable yet</h1>
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
            <div className="bg-[#bfccb6] p-3 rounded-full">
              <img src="/logo.svg" alt="" className="w-10" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{item?.subject}</h1>
              <h1 className="text-[#9e9e9e]"> {item?.message}</h1>

              <h1 className="font-light text-[#AB9C9C]">
                {formatDate(item?.created_at)}
              </h1>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
