import { useContext, useEffect, useState } from "react";
import { UserData } from "../../../../context/userDataContext";
import GetDataService from "../../../../utils/getData";
import TopNavbar from "../../../../components/shared/Navbar/TopNavbar";

interface BankAccount {
  accountName: string;
  accountNumber: number;
  bankName: string;
  created_at: string; // This field will be of type Date in case of dates
  flw_ref: string;
  id: number;
  user_id_fk: string;
}

export default function BankDetails() {
  const { user } = useContext(UserData);

  const [data, setData] = useState<BankAccount | null>(null);

  const getBankDetail = async () => {
    const result = await GetDataService.getVirtualAccount(user.id);

    if (result) {
      setData(result[0]);
    }
  };

  useEffect(() => {
    getBankDetail();
  }, []);

  console.log({ data });

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"Bank Topup"} />

      <div className="w-full bg-[#f9f9f9] flex flex-col gap-5 p-5 rounded-lg md:p-10">
        <h1>Bank Details</h1>

        {/* account name */}
        <div className="space-y-2">
          <h1 className="text-[91B9E6]">Account Name</h1>

          <h2 className="font-bold text-lg">{data?.accountName}</h2>
        </div>

        {/* bank name */}
        <div className="space-y-2">
          <h1 className="text-[91B9E6]">Bank Name</h1>

          <h2 className="font-bold text-lg">{data?.bankName}</h2>
        </div>

        {/* account number */}
        <div className="space-y-2">
          <h1 className="text-[91B9E6]">Account Number</h1>

          <h2 className="font-bold text-lg">{data?.accountNumber}</h2>
        </div>
      </div>
    </div>
  );
}
