/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoMdCloseCircle } from "react-icons/io";
import VerificationInput from "react-verification-input";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { UserData } from "../../../../context/userDataContext";
import PostDataService from "../../../../utils/postData";

interface PinModalProps {
  phone: any;
  btnName: string;
  pinId: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setVerifed: (phone: boolean) => void;
}

export default function VerifyPhone({
  phone,
  btnName,
  pinId,
  setModal,
  setVerifed,
}: PinModalProps) {
  const { user } = useContext(UserData);

  const [pinCode, setPinCode] = useState<string>("");
  const [disabled, setDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setModal(false);
  }

  const handleValidatePin = async () => {
    setIsLoading(true);
    setDisabled(true);

    try {
      await PostDataService.confirmOTP(user?.id, phone, Number(pinCode), pinId);

      setVerifed(true);
      setModal(false);

      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
          Phone Verified
        </div>
      );
    } catch (error) {
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
          Invalid Otp, try again
        </div>
      );
      setVerifed(false);
      setModal(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur">
      <div className="flex flex-col w-[90%] md:w-[35%] lg:w-[25%] gap-10 bg-white mx-auto p-5 border-2 rounded-xl min-h-[50vh]">
        <div className="flex justify-end">
          <IoMdCloseCircle
            onClick={closeModal}
            className="text-red-500 hover:text-red-700 hover:scale-110 cursor-pointer"
            size={30}
          />
        </div>
        <div className="flex flex-col gap-5 items-center justify-center">
          <div className="w-full">
            <h1 className="text-xl font-semibold text-center">
              Confirm Phone Number
            </h1>
            <p>( +{phone} )</p>
          </div>

          <div className="w-4/5 mx-auto">
            <VerificationInput
              length={6}
              onChange={setPinCode}
              passwordMode={false}
              classNames={{
                container: "container",
                character: "character",
                characterInactive: "character--inactive",
                characterSelected: "character--selected",
                characterFilled: "character--filled",
              }}
            />
          </div>
        </div>

        <button
          onClick={handleValidatePin}
          disabled={disabled}
          className={`w-full bg-green p-3 rounded text-white text-lg font-bold  ${
            disabled && "opacity-30"
          }`}
        >
          {isLoading ? <BeatLoader color="#fff" size={10} /> : <>{btnName}</>}
        </button>
      </div>
    </div>
  );
}
