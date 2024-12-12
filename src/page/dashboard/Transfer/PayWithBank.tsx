import { useContext, useEffect, useState } from "react";
import { UserData } from "../../../context/userDataContext";
import CryptoNotice from "../../../components/dashboard/Transfer/CryptoNotice";
import { GoShield } from "react-icons/go";
import { FiPlusCircle } from "react-icons/fi";
import BankCard from "../../../components/dashboard/Transfer/BankCard";
import GetDataService from "../../../utils/getData";
import AddAccount from "../../../components/dashboard/Transfer/AddAccount";
import PayP2p from "../../../components/dashboard/Transfer/PayP2p";
import TopNavbar from "../../../components/shared/Navbar/TopNavbar";
import { supabase } from "../../../constants/supabase";
import toast from "react-hot-toast";

export default function PayWithBank() {
  const { walletBal, rate, user } = useContext(UserData);
  const [notice, setNotice] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleP2p, setToggleP2p] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  const getListedAccountsData = async () => {
    const res = await GetDataService.listSavedAccounts(user?.id);

    if (res) {
      setSavedAccounts(res);
    }
  };

  const deleteP2PRecord = async(userId:string,bank_name:string, account_number:Number, account_name:string)=> {
    try {
      const { data, error } = await supabase
        .from("p2p")
        .delete()
        .eq("user_id_fk", userId)
        .eq("bank_name", bank_name)
        .eq("account_number", account_number)
        .eq("account_name", account_name).select();

      if (error) {
        throw error;
      }
      if(data !== null){
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
          Bank Deleted
        </div>
      );
      getListedAccountsData()
      return;
    }

    } catch (error:any) {
      toast.error("An error occured");
      console.error("Error deleting record:", error.message);
      return;
    }
  };

  useEffect(() => {
    getListedAccountsData();
  }, [user]);

  return (
    <>
      <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 text-black-100 bg-white-100 py-5">
        <TopNavbar name={"Pay With Bank"} />
        {/* avaliable */}
        <div>
          <h1 className="">Avaliable balance</h1>
          <h1 className="">
            NGN {(walletBal?.amount * rate?.buying).toFixed(2) || ""}
          </h1>
        </div>

        {/* charges */}
        <div className="flex flex-col gap-2">
          <button className="bg-tinaColor w-fit text-white py-1 px-2 rounded-xl">
            $1 <span className="text-[#ffeb3b]">=</span> {rate?.buying}
          </button>
        </div>

        {/* crypto notice */}
        {notice && <CryptoNotice setNotice={setNotice} />}

        {/* other */}

        {!notice && (
          <div className="w-full flex flex-col gap-5">
            {/* select modal */}
            <div className="w-full grid grid-cols-2 gap-5">
              <div className="bg-gray-200 p-3 rounded">
                <button className="bg-green w-full p-2 rounded text-white">
                  P2P
                </button>
              </div>
            </div>

            {/* add bank account */}
           {savedAccounts.length < 1 && <div className="w-full bg-[#eaefe7] rounded-lg p-5 space-y-5">
              {/* notice for adding bank account */}
              <div className="flex gap-2">
                <GoShield className="text-green" size={20} />

                <p>
                  Please ensure to enter your personal bank account with the
                  name matching your Documents.
                </p>
              </div>
            </div>}

            {/* add modal trigger */}
           {savedAccounts.length < 1 && <div
              onClick={() => setToggleAdd(true)}
              className="flex gap-5 items-end cursor-pointer"
            >
              <FiPlusCircle className="text-green" size={25} />
              <p className="text-sm">Add Bank Account</p>
            </div>}

            {savedAccounts.length > 0 && <h3>Linked Bank Account</h3> }

            {/* list of bank accounts */}
            <div className="flex flex-col gap-4">
              {savedAccounts?.map((item, index) => (
                <BankCard
                  key={index}
                  data={item}
                  setToggleP2p={setToggleP2p}
                  setSelectedBank={setSelectedBank}
                  deleteAccount={deleteP2PRecord}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* add bank accounts */}
      {toggleAdd && (
        <AddAccount savedAccounts={savedAccounts} setToggleAdd={setToggleAdd} fetchSavedAccount={getListedAccountsData} />
      )}

      {toggleP2p && (
        <PayP2p selectedBank={selectedBank} setToggleP2p={setToggleP2p} />
      )}
    </>
  );
}
