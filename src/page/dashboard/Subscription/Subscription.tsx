/* eslint-disable @typescript-eslint/no-explicit-any */
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import { Link } from "react-router-dom";
import subItem from "../../../assets/dashboard/subscriptions";
import toast from "react-hot-toast";

export default function Subscription() {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Subscriptions"} />
      <div className="grid grid-cols-1 gap-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {subItem.map((item: any, index: number) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Card = ({ icon, title, link }: any) => {
  const handleCommingSoon = () => {
    toast.custom(
      <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
        Comming soon!
      </div>
    );
  };
  return (
    <>
      {link ? (
        <Link
          to={link}
          className="bg-white cursor-pointer rounded-lg hover:bg-gray-100 shadow-lg p-4 flex flex-col items-center justify-center"
        >
          <div className="text-4xl text-gray-600 bg-center mb-4">
            <img src={icon} className="h-16" alt={title} />
          </div>
          <div className="text-lg text-gray-900 text-center">{title}</div>
        </Link>
      ) : (
        <div
          onClick={handleCommingSoon}
          className="bg-white cursor-pointer rounded-lg hover:bg-gray-100 shadow-lg p-4 flex flex-col items-center justify-center"
        >
          <div className="text-4xl text-gray-600 bg-center mb-4">
            <img src={icon} className="h-16" alt={title} />
          </div>
          <div className="text-lg text-gray-900 text-center">{title}</div>
        </div>
      )}
    </>
  );
};
