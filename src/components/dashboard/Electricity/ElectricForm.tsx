import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import check from "../../../assets/dashboard/electricity/check.svg";
import { useQuery } from "react-query";
import { nodeAxiosInstance } from "../../../utils/server/axiosUtils";
import { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { UserData } from "../../../context/userDataContext";
import toast from "react-hot-toast";
import Select from "react-select"; // Import React-Select

// Define Yup validation schema
const schema = yup.object().shape({
  disco: yup.string().required("Please select a disco"),
  meterType: yup.string().required("Please select a meter type"),
  meterNumber: yup.string().required("Please enter your meter number"),
  amount: yup
    .number()
    .min(1000, "Minimum vending amount is ₦1000")
    .typeError("Amount must be a number")
    .required("Please enter an amount")
    .positive("Amount must be a positive number")
    .integer("Amount must be an integer"),
});

interface IFormInput {
  disco: string;
  meterType: string;
  meterNumber: string;
  amount: number;
}

interface ElectricFormProps {
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ElectricForm: React.FC<ElectricFormProps> = ({
  setConfirmModal,
  setFormData,
}) => {
  const [_meterVerified, setMeterVerified] = useState(false);
  const [meterName, setMeterName] = useState("");
  const [loader, setLoader] = useState(false);
  const [isAmountEnabled, setIsAmountEnabled] = useState(false);

  // context
  const { userInfo, walletBal, rate } = useContext(UserData);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    setLoader(true);

    if (data.amount < 2500) {
      toast.error("Minimum vending amount is ₦2500");
      setLoader(false);
      return;
    }

    if (
      Number((walletBal?.amount * rate?.buying).toFixed(2)) <
      Number(data.amount)
    ) {
      toast.error("Insufficent Balance");
      setLoader(false);
      return;
    }

    try {
      const response = await nodeAxiosInstance.post("/api/elect/check_meter", {
        disco: data.disco,
        vendType: data.meterType.toUpperCase(),
        meter: Number(data.meterNumber),
      });

      if (!response?.data?.error && response?.data?.name) {
        setMeterVerified(true);
        setLoader(false);
        // setMeterName(response.data.name);

        setLoader(false);
        setFormData({
          meter: data.meterNumber,
          disco: data.disco,
          phone: userInfo?.phone_number,
          paymentType: "B2B",
          vendType: data.meterType,
          veritcal: "ELECTRICITY",
          amount: `${data.amount}`,
          email: userInfo?.email,
          name: response.data.name,
        });

        setConfirmModal(true);
      } else {
        setLoader(false);
        setMeterVerified(false);
        setMeterName("");
        return;
      }
    } catch (error: any) {
      toast.error("Ensure meter details are correct");
      console.error(error);
      setLoader(false);
    }
  };

  const { data: electricData } = useQuery(["getElectricData"], async () => {
    const response = await nodeAxiosInstance("/api/elect/getdisco");
    return response.data;
  });

  console.log({ electricData });

  const discoOptions = electricData
    ? Object.entries(electricData)
        .filter(([_key, value]) => value === true)
        .filter(
          ([key]) =>
            !["mtn", "dstv", "gotv", "startimes"].includes(key.toLowerCase())
        )
        .map(([key]) => ({
          value: key.toUpperCase(),
          label: key,
        }))
    : [];

  const disco = watch("disco");
  const meterType = watch("meterType");
  const meterNumber = watch("meterNumber");

  useEffect(() => {
    if (disco && meterType && meterNumber.length == 11) {
      const validateFields = async () => {
        setLoader(true);
        try {
          const response = await nodeAxiosInstance.post(
            "/api/elect/check_meter",
            {
              disco: disco,
              vendType: meterType.toUpperCase(),
              meter: Number(meterNumber),
            }
          );

          if (!response?.data?.error && response?.data?.name) {
            setMeterVerified(true);
            setMeterName(response.data.name);
            setIsAmountEnabled(true);
          } else {
            setMeterVerified(false);
            setMeterName("");
            setIsAmountEnabled(false);
          }
        } catch (error: any) {
          setMeterVerified(false);
          setMeterName("");
          setIsAmountEnabled(false);
          toast.error("Ensure meter details are correct");
          console.error(error);
        } finally {
          setLoader(false);
        }
      };

      validateFields();
    } else {
      setIsAmountEnabled(false);
    }
  }, [disco, meterType, meterNumber]);

  return (
    <div className="w-full mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5 mb-10 text-tinaGray">
      <h1 className="text-center text-tinaGray text-lg">
        Pay Electricity Bill
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[95%] md:w-4/5 mx-auto"
      >
        <Select
          options={discoOptions}
          className="basic-single"
          classNamePrefix="select"
          placeholder="--Disco--"
          onChange={(selectedOption) =>
            setValue("disco", selectedOption ? selectedOption.value : "")
          }
          styles={{
            // Optional: Custom styling
            container: (provided) => ({
              ...provided,
              marginBottom: "1rem",
            }),
            control: (provided) => ({
              ...provided,
              padding: "0.5rem",
              borderRadius: "0.375rem",
              borderColor: errors.disco ? "red" : provided.borderColor,
            }),
          }}
        />
        {errors.disco && <p className="text-red-500">{errors.disco.message}</p>}
        {/* 
        <select
          className="border-[1px] border-tinaGray p-4 rounded-lg"
          {...register("meterType")}
        >
          <option value="">Meter Type</option>
          <option value="prepaid">Prepaid</option>
          <option value="postpaid">Postpaid</option>
        </select> */}

        <Select
          options={[
            {
              value: "prepaid",
              label: "PREPAID",
            },
            {
              value: "postpaid",
              label: "POSTPAID",
            },
          ]}
          className="basic-single"
          classNamePrefix="select"
          placeholder="--Meter Type--"
          onChange={(selectedOption) =>
            setValue("meterType", selectedOption ? selectedOption.value : "")
          }
          styles={{
            // Optional: Custom styling
            container: (provided) => ({
              ...provided,
              marginBottom: "1rem",
            }),
            control: (provided) => ({
              ...provided,
              padding: "0.5rem",
              borderRadius: "0.375rem",
              borderColor: errors.disco ? "red" : provided.borderColor,
            }),
          }}
        />
        {errors.meterType && (
          <p className="text-red-500">{errors.meterType.message}</p>
        )}

        <input
          className="border-[1px] border-gray-300 p-4 rounded-lg"
          placeholder="Enter Meter Number"
          {...register("meterNumber")}
        />

        <span className="flex items-center gap-2">
          {meterName ? (
            <>
              <img src={check} alt="verified" />
              <p className="text-green"> {meterName}</p>
            </>
          ) : (
            <p className="text-yellow-500 -mt-2">Enter valid Meter details</p>
          )}
        </span>

        {errors.meterNumber && (
          <p className="text-red-500">{errors.meterNumber.message}</p>
        )}

        {_meterVerified && (
          <>
            {" "}
            <div
              className={`${
                !isAmountEnabled && "opacity-40"
              } flex gap-5 w-full border-[1px] border-gray-300 p-4 rounded-md itlgs-center`}
            >
              <label htmlFor="amount" className="font-bold text-lg">
                ₦
              </label>
              <input
                placeholder="Enter Amount"
                {...register("amount")}
                className="w-full outline-none bg-white bg-transparent focus:outline-none focus:bg-transparent"
                disabled={!isAmountEnabled}
              />
            </div>
            <p className="text-red-500">minimum vending amount it ₦2500</p>
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
          </>
        )}

        <button
          type="submit"
          className="bg-tinaColor text-white p-4 rounded-lg"
        >
          {loader ? <BeatLoader color="#fff" size={10} /> : "Confirm"}
        </button>
      </form>
    </div>
  );
};

export default ElectricForm;
