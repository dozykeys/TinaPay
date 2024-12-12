import { useFormik } from "formik";
import { useContext } from "react";
import { FaUser } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserData } from "../../../../context/userDataContext";
import toast from "react-hot-toast";
interface FormValues {
  network: string;
  phoneNumber: string;
  amount: string;
}

export default function AirtimeMain() {
  const navigate = useNavigate();
  const { walletBal, rate } = useContext(UserData);

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only numeric digits")
      .max(10, "Phone number must be 10 digits or less"),
    amount: Yup.number()
      .required("Amount is required")
      .min(50, "Amount must be 50 or greater")
      .max(
        Number(walletBal?.amount * rate?.buying),
        "Amount cannot be higher than balance"
      ),
    network: Yup.string()
      .required("Network selection is required")
      .notOneOf([""], "Please select a network"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      network: "",
      phoneNumber: "",
      amount: "",
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      if (Number(values.amount) > 5000) {
        toast.custom(
          <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
            <>max purchase is 5000</>
          </div>
        );

        return;
      }
      navigate("/bills/airtime/confirm", { state: { ...values } });
      console.log(values);
      // Handle form submission here
    },
  });

  return (
    <div className="w-[95%] mx-auto md:w-full flex flex-col gap-5">
      <h1 className="text-lg font-semibold text-primary">
        Top Up your airtime with ease.
      </h1>

      <form onSubmit={formik.handleSubmit} className="w-full space-y-5">
        {/* network */}
        <select
          name="network"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.network}
          className="capitalize w-full p-3 outline-none border-b border-gray-400 text-lg text-gray-500"
        >
          <option value="">Select Network</option>
          <option value="mtn">Mtn</option>
          <option value="glo">glo</option>
          <option value="airtel">airtel</option>
          <option value="9mobile">9mobile</option>
        </select>

        {/* phone */}
        <div className="w-full flex items-center">
          <div className="p-1">+234</div>
          <input
            type="text"
            name="phoneNumber"
            placeholder="888******"
            maxLength={10}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border-b p-3 outline-none border-gray-400"
          />
          <FaUser size={20} className="text-primary" />
        </div>

        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <p className="text-red-500">{formik.errors.phoneNumber}</p>
        ) : null}

        {/* amount */}
        <div className="w-full flex items-center">
          <TbCurrencyNaira
            size={35}
            className="text-primary bg-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="amount"
            min={50}
            placeholder="Enter Amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border-b p-3 outline-none border-gray-400 "
          />
        </div>

        {/* error */}
        {formik.touched.amount && formik.errors.amount ? (
          <p className="text-red-500">{formik.errors.amount}</p>
        ) : null}

        {/* balance */}
        <p className="text-right">
          Available Balance{" "}
          {/* <span className="text-green font-semibold">
            $ {walletBal?.amount}
          </span> */}
          <span className="text-green font-semibold">
            NGN {Number(rate?.buying) * Number(walletBal?.amount)}
          </span>
        </p>

        <div className="w-full flex justify-center">
          {!formik.isValid ? (
            <button
              disabled
              type="submit"
              className="bg-[#757575] text-white font-semibold p-2 rounded mx-auto"
            >
              Top Up Airtime
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#1B5E20] text-white font-semibold p-2 rounded mx-auto"
            >
              Top Up Airtime
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
