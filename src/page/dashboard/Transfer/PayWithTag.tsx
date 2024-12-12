/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { UserData } from "../../../context/userDataContext";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import PinModal from "../../../components/shared/Pin/PinModal";
import PostDataService from "../../../utils/postData";
import GetDataService from "../../../utils/getData";
import toast from "react-hot-toast";

export default function PayWithTag() {
  const { walletBal } = useContext(UserData);
  const [modal, setModal] = useState(false);
  const [totag, setTotag] = useState("");
  const [amount, setAmount] = useState(0);

  const [tagUsed, setTagUsed] = useState(false);

  const { userInfo } = useContext(UserData);

  const handleSubmit = (e: any) => {
    if (totag && !tagUsed) {
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
          An error occured
        </div>
      );
      return;
    }
    e.preventDefault();
    setModal(true);
  };

  const checkUserName = async () => {
    try {
      await GetDataService.checkTinaTag(totag);
      setTagUsed(false);
    } catch (error) {
      setTagUsed(true);
    }
  };

  useEffect(() => {
    checkUserName();
  }, [totag]);

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 text-black-100 bg-white-100 py-5">
      <TopNavbar name={"Pay With Tag"} />
      {/* avaliable */}
      <div>
        <h1 className="text-lg">Avaliable balance</h1>
        <h1 className="text-2xl font-semibold">${walletBal?.amount}</h1>
      </div>

      {/* paying to */}
      <h1 className="text-center text-lg">Who are you paying today?</h1>

      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 md:gap-10 w-[95%] mx-auto"
      >
        <div className="flex gap-2 items-center w-full mx-auto">
          <p className="px-4 py-2 bg-gray-300 font-bold">@</p>
          <div className="w-full flex flex-col gap-2">
            <input
              onChange={(e) => {
                setTotag(e.target.value);
              }}
              className="p-2 border-b w-full border-b-gray-400 outline-none focus:border-b-gray-700"
              type="text"
              required
              placeholder="Tag"
            />

            {totag && !tagUsed && (
              <p className="text-red-500">Tag does not exist</p>
            )}

            {!totag && tagUsed && (
              <p className="text-red-500">Tag does not exist</p>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center w-full mx-auto">
          <p className="px-4 py-2 bg-gray-300 font-bold">$</p>
          <div className="w-full flex flex-col gap-2">
            <input
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
              className="p-2 border-b w-full border-b-gray-400 outline-none focus:border-b-gray-700"
              type="number"
              step="any"
              required
              placeholder="Amount"
            />

            {amount > walletBal?.amount ? (
              <p className="text-red-500">
                Amount cannot be higher than balance
              </p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="bg-tinaColor p-3 hover:opacity-85 text-white w-[90%] mx-auto rounded"
        >
          NEXT
        </button>
      </form>

      {modal && (
        <PinModal
          funcToCall={async () => {
            await PostDataService.payWithTag(
              totag,
              userInfo?.tag,
              userInfo?.user_id_fk,
              amount,
              userInfo.phoneNumber
            );
          }}
          btnName="Send"
          setModal={setModal}
        />
      )}
    </div>
  );
}
