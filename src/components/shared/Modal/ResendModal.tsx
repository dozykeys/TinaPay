/* eslint-disable @typescript-eslint/no-unused-vars */
// SuccessModal.tsx
import React, { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../../constants/supabase";
import { IoMdCloseCircle } from "react-icons/io";
import { BeatLoader } from "react-spinners";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ResendModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const [loader, setLoader] = useState(false);

  if (!isOpen) return null;

  const handleResendEmail = async () => {
    setLoader(true);

    const { data } = await supabase.auth.resend({
      type: "signup",
      email: `${localStorage.getItem("tinapay_resend_email")}`,
      options: {
        emailRedirectTo: `${import.meta.env.VITE_WEB_URL}/auth/email_confirm`,
      },
    });

    if (data) {
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
          Confirmation email sent!
        </div>
      );

      setLoader(false);

      onClose();
      return;
    }

    toast.custom(
      <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
        An error occured
      </div>
    );
    setLoader(false);

    onClose();
    return;
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="w-full flex justify-end">
            <IoMdCloseCircle
              onClick={onClose}
              className="text-red-600"
              size={25}
            />
          </div>
          <div>
            <div className=" text-center pt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Email Not Confirmed
              </h3>
            </div>
          </div>

          <div className="mt-3 text-sm text-center flex items-center gap-1 justify-center">
            <p>You need to confirm your email to sign in</p>
          </div>

          <div className="mt-3 pb-5 text-sm text-center flex items-center gap-1 justify-center">
            <button
              onClick={handleResendEmail}
              className="text-tinaColor font-bold underline underline-offset-2 cursor-buttonointer hover:opacity-80"
            >
              {loader ? (
                <BeatLoader color="#1b5e20" size={15} />
              ) : (
                "Click to resend confirmation email"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendModal;
