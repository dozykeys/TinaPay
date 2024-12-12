import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import axios from "axios";
import { base_url } from "../../../constants/config";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "First Name can only contain letters")
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name must be at most 50 characters")
    .required("First Name is required"),
  lastName: yup.string().optional(),
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),

  phoneNumber: yup
    .string()
    .matches(/^(\+[0-9]{1,3})?[0-9]+$/, "Invalid phone number format")
    .required("Phone number is required"),

  message: yup.string().required("Message is required"),
});

interface ContactUsValues {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactUsForm = () => {
  const [loader, setLoader] = useState(false);

  const form = useForm<ContactUsValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (data: ContactUsValues) => {
    setLoader(true);

    try {
      console.log({
        name: data.firstName + " " + data.lastName,
        message: data.message,
        phone: data.phoneNumber,
        email: data.email,
      });
      await axios.post(`${base_url}/api/feedback/sendContactUs`, {
        name: data.firstName,
        message: data.message,
        phone: data.phoneNumber,
        email: data.email,
      });

      setTimeout(() => {
        toast.success("submitted...");

        reset();
        setLoader(false);
      }, 3000);
    } catch (error) {
      toast.error("an error occured, try again");
      setLoader(false);
    }
  };

  return (
    <div className="w-full bg-white  flex  justify-center items-center py-8 md:py-16">
      <div className="w-[90%] md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] flex flex-col md:flex-row justify-center items-center md:items-start gap-12">
        <div className="w-[90%] text-center md:text-left md:w-[40%] flex flex-col gap-4 md:gap-6">
          <h1 className="text-4xl font-bold">Let’s start a conversation</h1>
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="font-normal">
              With Tinapay, you can easily purchase cryptocurrencies, pay bills,
              trade gift cards, and manage your finances.
            </p>
            <p className="font-normal">
              Please complete the form on the right to connect with a member of
              our team.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-[60%] flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 w-full ">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName")}
              className="px-3 py-3 bg-white rounded text-gray-700 border border-black  focus:outline-none"
            />
            <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="Last Name (Optional)"
              {...register("lastName")}
              className="px-3 py-3 bg-white rounded text-gray-700 border border-black  focus:outline-none"
            />
            <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full ">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="px-3 py-3 bg-white rounded text-gray-700 border border-black  focus:outline-none"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full ">
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phoneNumber")}
              className="px-3 py-3 bg-white rounded text-gray-700 border border-black  focus:outline-none"
            />
            <p className="text-red-500 text-sm">
              {errors.phoneNumber?.message}
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full ">
            <textarea
              placeholder="Message"
              {...register("message")}
              className="px-3 py-3 bg-white rounded text-gray-700 border border-black  focus:outline-none"
              style={{ resize: "none", height: "200px" }}
            ></textarea>
            <p className="text-red-500 text-sm">{errors.message?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full px-2 py-3 bg-[#315B12] text-white rounded hover:opacity-90 self-start"
          >
            {loader ? <BeatLoader color="#fff" size={10} /> : " Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
