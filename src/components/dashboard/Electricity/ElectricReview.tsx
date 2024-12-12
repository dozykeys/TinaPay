import toast from "react-hot-toast";
import { useVendElectric } from "../../../hooks/apiMethods/useElectriMethod";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ElectricReviewProps {
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
}

const ElectricReview: React.FC<ElectricReviewProps> = ({
  setConfirmModal,
  formData,
}) => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const handleCloseModal = () => {
    setConfirmModal(false);
  };

  console.log({ formData });

  // on error
  const onError = async (error: any) => {
    console.log(error);

    const message = error?.response?.data?.message;

    toast.error(message);
    setConfirmModal(false);
    setLoader(false);

    console.log(error?.response);
  };

  // on success
  const onSuccess = (_data: any) => {
    setLoader(false);
    toast.success("success");
    navigate("/");
  };

  const {
    mutate: vend,
    // isLoading: vendLoading,
    // isError: vendError,
  } = useVendElectric(onError, onSuccess);

  const onSubmit = async () => {
    setLoader(true);
    // vend(data);
    vend(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="md:max-w-md w-[90%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 relative">
          <div className="font-bold text-lg text-center text-tinaColor">
            Review Your Order
          </div>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 absolute top-2 right-2 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-500">METER NUMBER</div>
            <div className="text-gray-900">{formData?.meter}</div>
            <div className="text-gray-500">NAME</div>
            <div className="text-gray-900">{formData?.name}</div>
            <div className="text-gray-500">METER TYPE</div>
            <div className="text-gray-900">
              {String(formData?.vendType).toUpperCase()}
            </div>
            <div className="text-gray-500">PHONE</div>
            <div className="text-gray-900">+{formData?.phone}</div>
            {/* <div className="text-gray-500">OUTSTANDING</div>
            <div className="text-gray-900">0.00</div>
            <div className="text-gray-500">ADDRESS</div>
            <div className="text-gray-900">
              1, Alpha Beach Road, Lekki, Lagos
            </div> */}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 space-y-2">
          <h1 className="font-bold text-center text-lg text-gray-900 mb-2">
            Payment Breakdown
          </h1>

          <div className="flex justify-between text-sm">
            <div className="text-gray-500">VEND AMOUNT</div>
            <div className="text-gray-900">
              ₦{Number(formData?.amount).toFixed(2)}
            </div>
          </div>
          {/* <div className="flex justify-between text-sm">
            <div className="text-gray-500">SERVICE CHARGE</div>
            <div className="text-gray-900">₦100.00</div>
          </div> */}
          {/* <div className="flex justify-between text-sm">
            <div className="text-gray-500">GATEWAY CHARGE</div>
            <div className="text-gray-900">₦0.00</div>
          </div>
          <div className="flex justify-between text-sm">
            <div className="text-gray-500">DISCOUNT</div>
            <div className="text-gray-900">₦0.00</div>
          </div> */}
          <div className="flex justify-between font-bold text-lg mt-2">
            <div className="text-gray-900">TOTAL</div>
            <div className="text-gray-900">
              ₦{Number(formData?.amount).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={onSubmit}
            className="w-full bg-tinaColor text-white text-center py-4 rounded"
          >
            {loader ? (
              <BeatLoader color="#fff" size={10} />
            ) : (
              `₦${Number(formData?.amount).toFixed(2)}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectricReview;
