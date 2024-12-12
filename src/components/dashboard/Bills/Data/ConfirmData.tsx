import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import PinModal from "../../../shared/Pin/PinModal";
import PostDataService from "../../../../utils/postData";
import { UserData } from "../../../../context/userDataContext";

export default function ConfirmData() {
  const { state } = useLocation();
  const [modal, setModal] = useState(false);

  const { token } = useContext(UserData);

  if (!state?.network || !state?.phoneNumber) {
    window.location.href = "/bills/data";

    return "";
  }

  const handleSend = async () => {
    setModal(true);
  };

  return (
    <>
      <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
        <div className="w-full p-5 bg-[#FBE9E7] flex flex-col gap-5 items-center justify-center font-medium">
          <h1>Total amount</h1>
          <h1 className="text-xl font-[600]">
            ₦{JSON.parse(state?.category)?.amount}
          </h1>
        </div>

        {/* description */}
        <div className="w-full space-y-5 rounded-xl border-t-8 p-5 border-green">
          {/* phone */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-left">To</h1>
            <p className="text-right">{state?.phoneNumber}</p>
          </div>

          {/* detail */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-left">Description</h1>
            <p className="text-right">
              {JSON.parse(state?.category)?.biller_name} airtime purchase for
              +234{state?.phoneNumber}
            </p>
          </div>
        </div>
        {/* confirm */}
        <button
          onClick={handleSend}
          className="p-3 w-full rounded bg-green text-white font-bold"
        >
          SEND
        </button>
      </div>

      {modal && (
        <PinModal
          funcToCall={async () => {
            await PostDataService.topUpData(
              JSON.parse(state.category),
              state.phoneNumber,
              token
            );
          }}
          btnName="Pay"
          setModal={setModal}
        />
      )}
    </>
  );
}
