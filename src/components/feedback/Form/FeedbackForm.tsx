import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoPaperclip } from "react-icons/go";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { base_url } from "../../../constants/config";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
  message: yup.string().required("Message is required"),
});

interface FeedbackValues {
  email: string;
  file?: File | null;
  message: string;
  phone?: string;
}

const MAX_FILE_SIZE_MB = 5;

const FeedbackForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);

  const form = useForm<FeedbackValues>({
    defaultValues: {
      email: "",
      file: undefined,
      message: "",
      phone: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = form;

  const uploadImage = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("key", `${import.meta.env.VITE_IMGBB_API}`);
      formData.append("image", file);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );

      return response;
    } catch (error) {
      setLoader(false);
      throw error;
    }
  };

  const onSubmit = async (data: FeedbackValues) => {
    console.log(data);
    setLoader(true);

    let response: any;

    if (data.file) {
      response = await uploadImage(data.file);
    }

    console.log({ response });
    try {
      console.log({
        email: data.email,
        desc: data.message,
        phone: data.phone,
        image: data.file && response.data.data.url,
      });
      await axios.post(`${base_url}/api/feedback/sendFeedback`, {
        email: data.email,
        desc: data.message,
        phone: data.phone,
        image: data.file && response.data.data.url,
      });

      toast.success("feedback submitted");

      reset();
      setTimeout(() => {
        window.location.href = "/feedback";
      }, 500);
      setLoader(false);
    } catch (error) {
      toast.error("an error occured, try again");
      setLoader(false);
    }
    // reset();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!isValidFileType(file)) {
        setErrorMessage(
          "Invalid file type. Please upload a .jpg, .jpeg, .png, or .pdf file."
        );
        setSelectedFile(null);
        setValue("file", null);
      } else if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMessage(
          `File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`
        );
        setSelectedFile(null);
        setValue("file", null);
      } else {
        setErrorMessage(null);
        setSelectedFile(file);
        setValue("file", file);
      }
    }
  };

  const isValidFileType = (file: File) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    return allowedTypes.includes(file.type);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setValue("file", null);
  };

  return (
    <div className="w-full bg-white  flex  justify-center items-center py-8 md:py-16">
      <div className="w-[90%] md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] flex flex-col md:flex-row justify-center items-center md:items-start gap-12">
        <div className="w-[90%] text-center md:text-left md:w-[40%] flex flex-col gap-4 md:gap-6">
          <h1 className="text-4xl font-bold">Send us your feedback!</h1>
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="font-normal">
              Have a suggestion or found a bug? We'd love to hear from you!
            </p>
            <p className="font-normal">
              Complete the form on the right to let us know.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-[60%] flex flex-col gap-4"
        >
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
            <textarea
              placeholder="Describe your issue or idea"
              {...register("message")}
              className="px-3 py-3 bg-white rounded text-gray-700 border border-black  focus:outline-none"
              style={{ resize: "none", height: "200px" }}
            ></textarea>
            <p className="text-red-500 text-sm">{errors.message?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full ">
            <input
              type="text"
              placeholder="Phone (Optional)"
              {...register("phone")}
              className="px-3 py-3 bg-white rounded text-gray-700 border border-black  focus:outline-none"
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>

          {selectedFile && (
            <p className="flex gap-1 items-center">
              <IoMdClose
                className="cursor-pointer"
                onClick={removeSelectedFile}
              />{" "}
              {selectedFile.name}
            </p>
          )}
          <label
            htmlFor="file-upload"
            className="flex gap-1 items-center text-[#156CF7] cursor-pointer"
          >
            <GoPaperclip />
            Upload your attachments
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf"
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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

export default FeedbackForm;
