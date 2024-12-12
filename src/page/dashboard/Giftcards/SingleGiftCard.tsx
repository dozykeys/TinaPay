import { useParams } from "react-router-dom";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import uploadImg from "../../../assets/dashboard/giftcards/card/upload.svg";

// import * as yup from "yup";
import { useContext, useState } from "react";
import { supabase } from "../../../constants/supabase";
import { UserData } from "../../../context/userDataContext";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import PostGiftService from "../../../utils/postGiftCard";

// // Define your validation schema using Yup
// const validationSchema = yup.object().shape({
//   category: yup.string().required("Category is required"),
//   subCategory: yup.string().required("Sub Category is required"),
//   cardAmount: yup
//     .number()
//     .required("Card amount is required")
//     .positive("Card amount must be positive"),
//   // Add more validation rules as needed
// });

export default function SingleGiftCard() {
  const { userInfo } = useContext(UserData);

  const { card } = useParams();
  const [formValues, setFormValues] = useState({
    category: "",
    subcategory: "",
    cardAmount: 0,
    comment: "",
    sendToWallet: false,
  });

  const [cardImage, setCardImage] = useState<any>();
  const [errors, setErrors] = useState<any>({});
  const [loader, setLoader] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCardImage(file);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoader(true);

    console.log({ formValues });
    const timestamp = new Date().toISOString().replace(/:/g, "-");

    const fileName = `${userInfo?.tag}_${timestamp}_${cardImage?.name}`;

    console.log({ fileName });

    try {
      await validateForm().then((res: any) => {
        console.log(res);

        if (!res) {
          throw new Error("fill all required fields");
        }
      });

      console.log("here");

      const { data, error } = await supabase.storage
        .from("giftcards")
        .upload("images/" + fileName, cardImage);

      const imgUrl =
        "https://cveqnhflspehyzntosga.supabase.co/storage/v1/object/public/giftcards/" +
        data?.path;

      console.log({ imgUrl });
      if (error) {
        console.log(error);
        throw new Error("Error uploading image");
      }

      const result = await PostGiftService.redeemGiftCard(
        userInfo.user_id_fk,
        userInfo.email,
        formValues.category,
        formValues.subcategory,
        imgUrl,
        formValues.cardAmount,
        formValues.comment,
        formValues.sendToWallet
      );

      console.log({ result });

      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
          Gift Redemption in process
        </div>,
        { duration: 4000 }
      );

      setFormValues({
        category: "",
        subcategory: "",
        cardAmount: 0,
        comment: "",
        sendToWallet: false,
      });

      setLoader(false);
    } catch (error: any) {
      setLoader(false);

      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
          <>{error?.message || ""}</>
        </div>
      );

      console.error(error.message);
      throw new Error(error?.message);
    }
  };

  const validateForm = async () => {
    const validationErrors: { [key: string]: string } = {};

    if (!formValues.category) {
      validationErrors["category"] = "Category is required";
    }
    if (!formValues.subcategory) {
      validationErrors["subcategory"] = "Subcategory is required";
    }
    if (formValues.cardAmount <= 0) {
      validationErrors["cardAmount"] = "Card amount must be greater than zero";
    }
    // Add more validation rules as needed

    // Handle checkbox separately
    // if (formValues.sendToWallet === false) {
    //   validationErrors["sendToWallet"] = "Please agree to send to wallet";
    // }

    // Handle image validation
    if (!cardImage) {
      validationErrors["cardImage"] = "Please upload an image";
    }

    setErrors(validationErrors);

    console.log({ obdh: Object.keys(validationErrors).length });

    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div
      className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col overflow-y-auto gap-5 bg-white-100 py-5"
      style={{ maxHeight: "calc(100vh - 150px)" }}
    >
      <TopNavbar name={`${card} Gift Card`} />

      <div className="w-full mx-auto flex flex-col gap-5">
        <h1 className="text-center">Trade Gift Card</h1>

        <form
          onSubmit={handleSubmit}
          className="w-[90%] md:w-5/6 flex flex-col gap-5 mx-auto"
        >
          {/* Category dropdown */}
          <select
            name="category"
            value={formValues.category}
            onChange={handleChange}
            className="rounded-md outline-none border-[2px] p-3"
          >
            <option className=" hover:bg-[#60AE1E] p-2" value="">
              Select Category
            </option>
            <option className=" hover:bg-[#60AE1E] p-2" value="dollar">
              Dollar
            </option>
            <option className=" hover:bg-[#60AE1E] p-2" value="euro">
              Euro
            </option>
            <option className=" hover:bg-[#60AE1E] p-2" value="pounds">
              Pounds
            </option>
            <option className=" hover:bg-[#60AE1E] p-2" value="canadian_dollar">
              Canadian Dollar
            </option>
            {/* Add options dynamically */}
          </select>
          {/* Display category error message */}
          {errors.category && (
            <div className="text-sm -mt-4 text-red-500">{errors.category}</div>
          )}

          {/* Subcategory dropdown */}
          <select
            name="subcategory"
            value={formValues.subcategory}
            onChange={handleChange}
            className="rounded-md outline-none border-[2px] p-3"
          >
            <option className=" hover:bg-[#60AE1E] p-2" value="">
              Select Subcategory
            </option>
            <option className=" hover:bg-[#60AE1E] p-2" value="physical">
              Physical
            </option>
            <option className=" hover:bg-[#60AE1E] p-2" value="scanned">
              Scanned
            </option>
            <option className=" hover:bg-[#60AE1E] p-2" value="eCode">
              eCode
            </option>
            {/* Add options dynamically based on selected category */}
          </select>
          {errors.subcategory && (
            <div className="text-sm -mt-4 text-red-500">
              {errors.subcategory}
            </div>
          )}

          {/* Card amount input */}
          <input
            type="number"
            name="cardAmount"
            value={formValues.cardAmount}
            onChange={handleChange}
            className="rounded-md outline-none border-[2px] p-3"
          />
          {/* Display card amount error message */}
          {errors.cardAmount && (
            <div className="text-sm -mt-4 text-red-500">
              {errors.cardAmount}
            </div>
          )}

          {/* Optional comment textarea */}
          <textarea
            placeholder="comment"
            name="comment"
            value={formValues.comment}
            onChange={handleChange}
            rows={5}
            className="rounded-md outline-none border-[2px] p-3"
          />

          {/* Card image input */}
          {/* Card image input */}
          <div className="w-full flex flex-col gap-5 items-center">
            <h1 className="font-medium text-tinaColor">Upload Card Image</h1>

            <label
              htmlFor="fileInput"
              className="relative flex flex-col items-center gap-2 cursor-pointer"
            >
              {/* Display small preview of the selected image or upload image */}
              {cardImage ? (
                <>
                  <img
                    src={URL.createObjectURL(cardImage)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <p className="text-tinaColor">{cardImage.name}</p>
                </>
              ) : (
                <img
                  src={uploadImg}
                  alt="Upload"
                  className="w-14 h-14 object-cover rounded"
                />
              )}

              <input
                id="fileInput"
                type="file"
                className="hidden w-full h-full cursor-pointer"
                name="cardImage"
                onChange={handleImageChange}
              />

              <p className="text-[#282A37]">
                Drag & Drop or <span className="text-[#156CF7]">choose</span>{" "}
                file to upload
              </p>

              {/* Display the name of the selected image */}

              <p className="text-[#515978]">
                Supported file types: jpeg, png, pdf. Max file size: 5mb
              </p>
            </label>
          </div>

          {/* Rate */}

          <div className="w-full flex gap-1 items-center">
            <hr className="bg-black h-[2px] w-full" />
            <h1 className="text-center w-full">Rate = 1,280/$</h1>
            <hr className="bg-black h-[2px] w-full" />
          </div>

          {/* Radio button for sending to wallet */}
          <label className="w-full flex gap-3 items-center">
            <input
              type="checkbox"
              name="sendToWallet"
              checked={formValues.sendToWallet}
              onChange={handleChange}
            />
            Send Directly To My USD Wallet
          </label>
          {errors.sendToWallet && (
            <div className="text-sm -mt-4 text-red-500">
              {errors.sendToWallet}
            </div>
          )}

          {/* Submit button */}
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between">
              <h1>You will receive </h1>
              <h1 className="font-bold">$1,280 </h1>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-md bg-tinaColor outline-none p-4 text-white"
            >
              {loader ? <BeatLoader color="#fff" size={10} /> : "Submit Trade"}
            </button>

            {/* Notice */}
            <div className="w-full text-[#7d7c7c] flex flex-col gap-2 mt-5">
              <h1 className="mb-2 font-semibold text-md">NOTICE</h1>

              <ul className="list-decimal">
                <li>Processing Time: Orders take 2-10 minutes to process.</li>
                <li>
                  Rates: Rates vary for single cards over $100 and under $100.
                </li>
                <li>Card Types: We do not accept music or email cards.</li>
                <li>
                  Confirmation: Please confirm the card denomination carefully
                  before trading.
                </li>
                <li>
                  Processing Time: iTunes cards may take some time to process;
                  please wait patiently after uploading.
                </li>
                <li>
                  Rate Disclaimer: The rate for ITS regular purchase cards will
                  be very low.
                </li>
                <li>
                  Physical Cards: The rate for horizontal physical cards is
                  lower than for normally-shaped physical cards; payment will be
                  in USD code.
                </li>
                <li>
                  Missing Code: Physical cards with missing codes will be paid
                  at the code rate, if the card is otherwise in good condition.
                </li>
                <li>
                  Contact: If you have any doubts during trading, please contact
                  us on WhatsApp
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
