/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { UserData } from "../../../context/userDataContext";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import PinModal from "../../../components/shared/Pin/PinModal";
import PostDataService from "../../../utils/postData";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";

interface FormData {
  walletAddress: string;
  amount: number | null;
  selectedOption: string;
}

const PayWithCrypto = () => {
  const { walletBal, user, userInfo } = useContext(UserData);
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);

  console.log(Number(walletBal?.amount));

  const [formValue, setFormValue] = useState<any>({
    walletAddress: "",
    amount: 0,
    selectedOption: "",
  });

  const initialValues: FormData = {
    walletAddress: "",
    amount: null,
    selectedOption: "btc", // Default selected option
  };
  const validationSchema = Yup.object().shape({
    walletAddress: Yup.string().required("Wallet Address is required"),
    amount: Yup.number()
      .required("withdrawal amount is required")
      .min(100, "minimum withdrawal limit of $100 for cryptocurrency assets")
      .max(
        Number(walletBal?.amount),
        "withdrawal amount cannot be higher than balance"
      ),
  });

  const handleSubmit = (values: FormData) => {
    // console.log({ values });

    setFormValue({
      walletAddress: values.walletAddress,
      amount: values.amount,
      selectedOption: values.selectedOption,
    });
    setModal(true);
  };

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 text-black-100 bg-white-100 py-5">
      <TopNavbar name={"Pay With Crypto"} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-5">
            {/* available */}
            <div>
              <h1 className="text-lg">Available balance</h1>
              <h1 className="text-2xl font-semibold">${walletBal?.amount}</h1>
            </div>

            {/* charges */}
            <div className="flex flex-col gap-2">
              <button className="bg-tinaColor w-fit text-white py-1 px-2 rounded-xl">
                Network fee <span className="text-[#ffeb3b]">:</span> 1.5%
              </button>
              <button className="bg-tinaColor w-fit text-white py-1 px-2 rounded-xl">
                You pay <span className="text-[#ffeb3b]">:</span> $0.00
              </button>
            </div>

            {/* crypto */}
            <div className="flex flex-col gap-2 font-bold">
              <label className="flex gap-2 items-center">
                <Field type="radio" name="selectedOption" value="btc" />
                <p>BTC (Bitcoin)</p>
              </label>
              <label className="flex gap-2 items-center">
                <Field type="radio" name="selectedOption" value="eth" />
                <p>ETH (Ethereum)</p>
              </label>
            </div>

            {/* liability */}
            <p className="text-tinaColor font-semibold text-sm space-x-2">
              <span className="text-red-600">*</span> TinaPay will not be liable
              for a wrong address!
            </p>

            {/* form */}
            <div className="flex flex-col gap-5 w-[95%] mx-auto">
              <Field
                className="border-b p-2 border-b-gray-400 outline-none focus:border-b-gray-700"
                type="text"
                name="walletAddress"
                placeholder="Wallet Address"
              />
              <ErrorMessage
                name="walletAddress"
                component="div"
                className="text-red-600"
              />

              <div className="flex gap-3 items-center w-full mx-auto">
                <p className="px-4 py-2 bg-gray-300 font-bold">$</p>
                <div className="w-full flex flex-col gap-2">
                  <Field
                    className="border-b p-2 w-full border-b-gray-400 outline-none focus:border-b-gray-700"
                    type="number"
                    name="amount"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-600"
                  />
                  <p className="font-semibold">Enter an amount</p>
                </div>
              </div>

              <button
                type="submit"
                className="bg-tinaColor hover:opacity-85 p-3 text-white w-full mx-auto rounded"
              >
                {loader ? <BeatLoader color="#fff" size={10} /> : "SEND"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {modal && (
        <PinModal
          funcToCall={async () => {
            await PostDataService.CryptoRequest(
              walletBal?.amount,
              user?.id,
              formValue.selectedOption,
              formValue.walletAddress,
              Number(formValue.amount),
              "",
              userInfo?.first_name + " " + userInfo?.last_name
            )
              .then(() => {
                toast.custom(
                  <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
                    Crypto request successful
                  </div>
                );

                setLoader(false);
              })
              .catch((error) => {
                toast.custom(
                  <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
                    An error occured, try again
                  </div>
                );
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
};

export default PayWithCrypto;
