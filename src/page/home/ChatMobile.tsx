// import DocIcon from "../../assets/home/doc.svg";
// import ArrRightIcon from "../../assets/dashboard/support/right.svg";
import SendIcon from "../../assets/dashboard/main/sendIcon.svg";
import { useParams } from "react-router-dom";

export default function ChatMobile() {
  const { username } = useParams();

  return (
    <div className="w-full h-screen lg:hidden">
      <div className="h-1/4 bg-[#27490E]"></div>

      <div className="flex-1 text-white -mt-24 px-4">
        <h1 className="text-2xl font-light">Hi {username}</h1>

        <h1 className="text-3xl font-bold">How can we Help?</h1>
      </div>

      {/* <Link
        to={"/faq"}
        className="flex cursor-pointer mx-5 bg-white shadow-lg py-2 rounded-lg mt-4 px-5 justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <img src={DocIcon} alt="" />
          <button className="bg-white text-green-700  py-2 rounded-md mr-4">
            FAQs
          </button>
        </div>

        <img src={ArrRightIcon} alt="" />
      </Link> */}

      <div className="flex mx-5 bg-white shadow-lg py-4 rounded-lg mt-4 px-5 justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-bold">Send a message</h1>

          <p>We are Available 24 hours</p>
        </div>

        <img src={SendIcon} width={25} alt="" />
      </div>
    </div>
  );
}
