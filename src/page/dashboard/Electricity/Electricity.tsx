import { useContext, useState } from "react";
import ElectricForm from "../../../components/dashboard/Electricity/ElectricForm";
import ElectricReview from "../../../components/dashboard/Electricity/ElectricReview";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import { UserData } from "../../../context/userDataContext";

const initialFormState = {
  // disco: "",
  // meterType: "",
  // meterNumber: "",
  // amount: 0,

  orderId: "",
  meter: "",
  disco: "",
  phone: "",
  paymentType: "",
  vendType: "",
  veritcal: "",
  amount: "",
  email: "",
  name: "",
};

export default function Electricity() {
  const [confirmModal, setConfirmModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const { walletBal, rate } = useContext(UserData);

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Electricity"} />

      <div>
        <h1 className="">Avaliable balance</h1>
        <h1 className="text-tinaColor">
          NGN {(walletBal?.amount * rate?.buying).toFixed(2) || ""}
        </h1>
      </div>

      {/* charges */}
      <div className="flex flex-col gap-2">
        <button className="bg-tinaColor w-fit text-white py-1 px-2 rounded-xl">
          $1 <span className="text-[#ffeb3b]">=</span> {rate?.buying}
        </button>
      </div>

      <div className="w-full">
        <ElectricForm
          setConfirmModal={setConfirmModal}
          setFormData={setFormData}
        />
        {confirmModal && (
          <ElectricReview
            setConfirmModal={setConfirmModal}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
}
