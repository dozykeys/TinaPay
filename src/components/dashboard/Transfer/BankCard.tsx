import { MdOutlineDeleteForever } from "react-icons/md";

export default function BankCard({ data, setToggleP2p, setSelectedBank ,deleteAccount}: any) {
  return (
    <div className="w-full flex gap-2 justify-between cursor-pointer ">
    <div
      className="w-full flex gap-2 justify-between cursor-pointer hover:opacity-70"
      onClick={() => {
        setToggleP2p(true);
        setSelectedBank(data);
      }}
    >
      <div className="flex gap-2 items-center">
        <div className="w-16 h-16 rounded-full bg-[#eaefe7] flex justify-center items-center">
          <h1 className="font-semibold">{data?.bank_name.charAt(0)}</h1>
        </div>

        <div className="block">
          <h1 className="md:text-xl font-semibold">{data?.account_name}</h1>
          <p>{data?.bank_name}</p>
        </div>

        <h2 className="text-semibold">{data?.account_number}</h2>
      </div>
    </div>
      <MdOutlineDeleteForever  className="hover:opacity-70" onClick={()=>{deleteAccount(data?.user_id_fk,data?.bank_name,data?.account_number,data?.account_name)}}  style={{ cursor: "pointer", fontSize: "20px",color: "red", marginLeft: "26px" }}/>
    </div>
  );
}
