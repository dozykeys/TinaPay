import { IoMdCloseCircle } from "react-icons/io";
import lock_forgot from "../../../assets/shared/lock_forgot.png";
import VerificationInput from "react-verification-input";
import { useContext, useState } from "react";
import PostDataService from "../../../utils/postData";
import { UserData } from "../../../context/userDataContext";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface PinModalProps {
  btnName: string;
  funcToCall: () => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PinModal({
  btnName,
  funcToCall,
  setModal,
}: PinModalProps) {
  const [pinCode, setPinCode] = useState<string>("");
  const { user } = useContext(UserData);
  const [disabled, setDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function closeModal() {
    navigate("/dashboard");
    setModal(false);
  }

  const handleValidatePin = async () => {
    setIsLoading(true);
    setDisabled(true);
    await PostDataService.validatePin(user.id, pinCode)
      .then(async () => {
        await funcToCall();
        setIsLoading(false);

        setTimeout(() => {
          closeModal();
        }, 2000);
      })
      .catch((err) => {
        setDisabled(false);
        setIsLoading(false);
        console.log(err);
        // toast.error(err.message);
        setTimeout(() => {
          closeModal();
        }, 2000);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur">
      <div className="flex flex-col w-[90%] md:w-2/5 gap-10 bg-white mx-auto p-5 border-2 rounded-xl min-h-[50vh]">
        <div className="flex justify-end">
          <IoMdCloseCircle
            onClick={closeModal}
            className="text-red-500 hover:text-red-700 hover:scale-110 cursor-pointer"
            size={30}
          />
        </div>
        <div className="flex flex-col gap-5 items-center justify-center">
          <h1 className="text-xl font-semibold text-center">Confirm</h1>

          <img src={lock_forgot} className="w-24" alt="" />

          <div className="space-y-1 text-center">
            <h2 className="text-sm font-medium">Complete Action</h2>
            <p className="text-sm text-gray-400">
              To proceed, kindly enter your transaction pin
            </p>
          </div>

          <div className="w-4/5 mx-auto">
            <VerificationInput
              length={4}
              onChange={setPinCode}
              passwordMode={true}
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
