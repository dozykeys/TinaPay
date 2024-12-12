/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { UserData } from "../../../context/userDataContext";
import PostDataService from "../../../utils/postData";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import PinModal from "../../shared/Pin/PinModal";

export default function PayP2p({ selectedBank, setToggleP2p }: any) {
  const { walletBal, rate, user, userInfo } = useContext(UserData);
  const [modal, setModal] = useState(false);

  const [loader, setLoader] = useState(false);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .max(
        Number(walletBal?.amount * rate?.buying),
        "Amount cannot be higher than balance"
      ),
  });

  const handleSend = async () => {
    setModal(true);
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      console.log(values);
      setLoader(true);
      handleSend();
    },
  });

  return (
    <div className="w-[100%] h-screen fixed top-0 flex flex-col">
      <div
        onClick={() => setToggleP2p(false)}
        className="h-1/4 md:h-2/5 backdrop-brightness-75 backdrop-blur-sm"
      ></div>
      <div className="w-[100%] h-3/4 md:h-3/5 py-10 bg-white p-5 shadow rounded--t-2xl border-t-2 flex flex-col gap-10">
        <h1 className="font-semibold text-xl">Input Amount</h1>

        {/* form */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-5/6 md:w-3/5 lg:w-2/5 flex flex-col gap-5"
        >
          <div className="w-full flex gap-2">
            <h1 className="p-3 font-semibold bg-gray-300 text-xl">₦</h1>
            <input
              type="text"
              name="amount"
              placeholder="Enter Amount"
              maxLength={10}
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border-b p-3 outline-none border-gray-400"
            />
          </div>
          {formik.touched.amount && formik.errors.amount ? (
            <p className="text-red-500">{formik.errors.amount}</p>
          ) : null}

          <button
            type="submit"
            className={`bg-[#1B5E20] text-white hover:bg-opacity-85 p-4 w-full rounded-md mx-auto ${
              formik.touched.amount &&
              formik.errors.amount &&
              "opacity-70 cursor-default hover:opacity-90"
            }`}
          >
            {loader ? <BeatLoader color="#fff" size={10} /> : " CONTINUE"}
          </button>

          <p>
            Avaliable Balance:{" "}
            <span className="text-green font-semibold">
              $ {walletBal?.amount}
            </span>{" "}
            ={" "}
            <span className="text-green font-semibold">
              ₦ {(walletBal?.amount * rate?.buying).toFixed(2) || ""}
            </span>
          </p>
        </form>
      </div>

      {modal && (
        <PinModal
          funcToCall={async () => {
            await PostDataService.P2pRequest(
              walletBal?.amount,
              rate?.buying,
              user?.id,
              selectedBank.bank_name,
              selectedBank.account_number,
              Number(formik.values.amount),
              "",
              userInfo?.first_name + userInfo?.last_name,
              userInfo?.first_name
            )
              .then(() => {
                toast.success("P2p request successful");
                setLoader(false);
                formik.resetForm();
                setToggleP2p(false);
              })
              .catch((error) => {
                console.log({ error });
                setLoader(false);
              });
          }}
          btnName="Pay"
          setModal={setModal}
        />
      )}
    </div>
  );
}
