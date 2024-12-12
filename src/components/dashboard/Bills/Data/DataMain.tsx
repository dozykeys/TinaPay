/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserData } from "../../../../context/userDataContext";
import GetDataService from "../../../../utils/getData";
import toast from "react-hot-toast";
interface FormValues {
  network: string;
  phoneNumber: string;
  category: string;
}

export default function DataMain() {
  const navigate = useNavigate();
  const { walletBal, rate, token } = useContext(UserData);

  const [billsData, setBillsData] = useState<any>(null);

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only numeric digits")
      .max(10, "Phone number must be 10 digits or less"),
    category: Yup.string()
      .required("Network selection is required")
      .notOneOf([""], "Please select a network"),
    network: Yup.string()
      .required("Network selection is required")
      .notOneOf([""], "Please select a network"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      network: "",
      phoneNumber: "",
      category: "",
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      // Parse the category string to an object
      const categoryObject = JSON.parse(values?.category);

      // Access the amount property from the category object
      const categoryAmount = categoryObject?.amount;

      // Check if categoryAmount is a valid number
      if (typeof categoryAmount !== "number") {
        // Handle error case where categoryAmount is not a number
        console.error("Category amount is not a valid number");
        return;
      }

      // Compare categoryAmount with walletBal?.amount
      if (Number(categoryAmount) > Number(walletBal?.amount * rate?.buying)) {
        toast.custom(
          <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
            Amount exceeds balance
          </div>
        );
        return;
      }

      navigate("/bills/data/confirm", { state: { ...values } });
      console.log(values);
      // Handle form submission here
    },
  });

  const getBillsData = async () => {
    const res = await GetDataService.loadBillCategories(token);

    if (res) {
      // Filter the billsData array based on the selected network
      const filteredData = res.filter((item: any) =>
        item.biller_name
          .toLowerCase()
          .includes(formik.values.network.toLowerCase())
      );

      // Set the filtered data to the category
      setBillsData(filteredData);
    }
  };

  useEffect(() => {
    if (formik.values.network !== "") {
      getBillsData();
    }
  }, [formik.values.network]);

  return (
    <div className="w-[95%] mx-auto md:w-full flex flex-col gap-5">
      <h1 className="text-lg font-semibold text-primary">
        Top Up your Data with ease.
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

        {/* category */}
        <select
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
          className="w-full p-3 outline-none border-b border-gray-400 text-lg text-gray-500"
        >
          <option value="">Select a Category</option>
          {billsData &&
            formik.values.network &&
            billsData.map((item: any) => (
              <option key={item.biller_name} value={JSON.stringify(item)}>
                {item.name} - ₦{item.amount}
              </option>
            ))}
        </select>

        {/* balance */}
        <p className="text-right">
          Available Balance{" "}
          {/* <span className="text-green font-semibold">
            $ {walletBal?.amount}
          </span> */}
          <span className="text-green font-semibold">
            NGN {(Number(rate?.buying) * Number(walletBal?.amount)).toFixed(2)}
          </span>
        </p>

        <div className="w-full flex justify-center">
          {!formik.isValid ? (
            <button
              disabled
              type="submit"
              className="bg-[#757575] text-white font-semibold p-2 rounded mx-auto"
            >
              Top Up Data
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#1B5E20] text-white font-semibold p-2 rounded mx-auto"
            >
              Top Up Data
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
