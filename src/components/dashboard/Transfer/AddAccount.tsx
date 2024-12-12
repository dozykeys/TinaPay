/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import GetDataService from "../../../utils/getData";
import { UserData } from "../../../context/userDataContext";
import PostDataService from "../../../utils/postData";
import toast from "react-hot-toast";

export default function AddAccount({
  savedAccounts,
  setToggleAdd,
  fetchSavedAccount,
}: any) {
  const { user, userInfo } = useContext(UserData);
  const [searchTerm, setSearchTerm] = useState("");

  // console.log({ userInfo });

  const [bankLists, setBankLists] = useState([]);
  const [showBanks, setShowbanks] = useState(false);

  const getBankListsData = async () => {
    const res = await GetDataService.getBank(user?.id);

    // console.log(res);

    if (res) {
      setBankLists(res);
    }
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const handleSelectBank = (bank: any) => {
    // setSelectedBank(bank);
    formik.setFieldValue("bank", JSON.stringify(bank));
    setShowbanks(false)
  };
  useEffect(() => {
    getBankListsData();
  }, []);

  const validationSchema = Yup.object().shape({
    acctNumber: Yup.string()
      .required("Beneficiary Account Number is required")
      .matches(
        /^\d+$/,
        "Beneficiary Account Number must contain only numeric digits"
      )
      .max(10, "Beneficiary Account Number must be 10 digits or less"),
    acctName: Yup.string().optional(),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      bank: "", // Add your bank state if needed
      acctNumber: "",
      acctName: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      // console.log(values);
      // console.log(JSON.parse(values.bank));
      await PostDataService.saveBankAccount(
        savedAccounts,
        user?.id,
        JSON.parse(values.bank).name,
        values.acctNumber,
        values.acctName,
        userInfo?.first_name,
        userInfo?.last_name
      ).then(() => {
        toast.success("Bank Acccount Added");
        formik.resetForm();
        // getBankListsData();
        fetchSavedAccount();
        setToggleAdd(false);
      });
    },
  });

  const getAccountName = async (acctNumber: string) => {
  
    try {
      const res = await GetDataService.verifyAccount(
        user?.id,
        JSON.parse(formik.values.bank).code,
        acctNumber
      );


      formik.values.acctName = res?.account_name;

      return res.accountName;
    } catch (error:any) {
      formik.setFieldError("bank",error.message);
      console.error("Error fetching account name:", error);
      return ""; // Return empty string if unable to fetch account name
    }
  };

  useEffect(() => {
    if (formik.values.acctNumber.length === 10) {
      getAccountName(formik.values.acctNumber);
    }
  }, [formik.values.acctNumber]);

  return (
    <div className="w-[100%] h-screen fixed top-0 flex flex-col">
      <div
        onClick={() => setToggleAdd(false)}
        className="h-1/4 md:h-2/5 backdrop-brightness-75 backdrop-blur-sm"
      ></div>
      <div className="w-[100%] h-3/4 md:h-3/5 py-10 bg-white p-5 shadow rounded--t-2xl border-t-2 flex flex-col gap-10">
        <h1 className="font-semibold text-xl">Add Account</h1>

        {/* form */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-5/6 md:w-3/5 lg:w-2/5 flex flex-col gap-5"
        >
          
          {showBanks ? (
            <BankSearch
              bankLists={bankLists}
              searchTerm={searchTerm}
              onSelectBank={handleSelectBank}
              onSearchChange={handleSearchChange}
            />
          ) : (
            <>
            <input
            type="text"
            name="bank"
            contentEditable={true}
            readOnly
            // disabled={true}
            onClick={()=>setShowbanks(true)}
            placeholder="Select Bank"
            value={formik.values.bank ? JSON.parse(formik.values.bank)?.name : ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border-b p-3 outline-none border-gray-400"
          />
              {formik.touched.bank && formik.errors.bank ? (
                <p className="text-red-500">{formik.errors.bank}</p>
              ) : null}

              <input
                type="text"
                name="acctNumber"
                placeholder="Beneficiary Account Number"
                maxLength={10}
                value={formik.values.acctNumber}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                className="w-full border-b p-3 outline-none border-gray-400"
              />
              {formik.touched.acctNumber && formik.errors.acctNumber ? (
                <p className="text-red-500">{formik.errors.acctNumber}</p>
              ) : null}

              <input
                type="text"
                name="acctName"
                contentEditable={true}
                disabled={true}
                placeholder="Beneficiary Name"
                value={formik.values.acctName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border-b p-3 outline-none border-gray-400"
              />
              {formik.touched.acctName && formik.errors.acctName ? (
                <p className="text-red-500">{formik.errors.acctName}</p>
              ) : null}

              <button
                type="submit"
                className="bg-[#1B5E20] text-white hover:bg-opacity-85 p-4 w-full rounded-md mx-auto"
              >
                SAVE ACCOUNT DETAILS
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
const BankSearch = ({
  searchTerm,
  onSearchChange,
  bankLists,
  onSelectBank,
}: any) => {
  const filteredBanks = bankLists.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full border-b p-3 outline-none border-gray-400">
      <input
        type="text"
        placeholder="Search Bank"
        value={searchTerm}
        onChange={onSearchChange}
        className="w-full border-b p-3 outline-none border-gray-400"
      />
      <div
        className="border border-gray-400 rounded-md overflow-y-scroll max-h-48 "
        style={{ marginTop: "20px" }}
      >
        {filteredBanks.length > 0 ? filteredBanks.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => onSelectBank(item)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            {item.name}
          </div>
        )):
        <p>Loading..</p>}
      </div>
    </div>
  );
};
