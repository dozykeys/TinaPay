/* eslint-disable @typescript-eslint/no-explicit-any */
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import { giftcardImages } from "../../../assets/dashboard/giftcards";
import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { UserData } from "../../../context/userDataContext";

export default function GiftCards() {
  return (
    <div
      className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col overflow-y-auto gap-5 bg-white-100 py-5"
      style={{ maxHeight: "calc(100vh - 150px)" }}
    >
      <TopNavbar name={"Gift Cards"} />

      <div className="grid grid-cols-1 gap-5 ">
        <div className="grid grid-cols-2 gap-5">
          {giftcardImages.map((giftcard: any, index: number) => (
            <GiftCardItem giftcard={giftcard} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface GiftCardItemProps {
  giftcard: {
    bgColor: string;
    image: any;
    name: string;
  };
}

export const GiftCardItem: React.FC<GiftCardItemProps> = ({ giftcard }) => {
  // const { userInfo } = useContext(UserData);

  return (
    <Link
      to={`/subscriptions/giftcards/${giftcard?.name}`}
      className={`rounded-md cursor-pointer overflow-hidden shadow-md shadow-gray-100 bg-cover h-[10rem] bg-center ${giftcard?.bgColor} flex items-center justify-center `}
    >
      <img src={giftcard.image} className="w-40" alt="Centered Image" />
    </Link>
    // <a
    //   target="_blank"
    //   href={`https://api.whatsapp.com/send?phone=2348058074322&text=${encodeURIComponent(
    //     `Hi there is ${userInfo?.tag} from Tinapay! I'd like to redeem my ` +
    //       (giftcard?.name ? giftcard.name : "") +
    //       " gift card. Please assist me with the redemption process. Thank you!"
    //   )}`}
    //   className={`rounded-md cursor-pointer overflow-hidden shadow-md shadow-gray-100 bg-cover h-[10rem] bg-center ${giftcard?.bgColor} flex items-center justify-center `}
    // >
    //   <img src={giftcard.image} className="w-40" alt="Centered Image" />
    // </a>
  );
};
