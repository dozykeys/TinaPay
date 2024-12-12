import { GoShield } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function CryptoNotice({ setNotice }: any) {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#bfccb6] rounded-lg p-5 space-y-5">
      <GoShield className="text-green" size={20} />

      <p>
        Will you make sure no crypt-related reference is in the narration e.g
        <span className="font-semibold">
          {" "}
          Crypto, BTC, Bitcoin, or Fund wallet?
        </span>
      </p>

      <div className="w-full grid grid-cols-2 gap-5">
        <button
          onClick={() => setNotice(false)}
          className="bg-tinaColor text-white hover:opacity-85 p-4 rounded-md"
        >
          YES
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-tinaColor hover:opacity-85 shadow p-4 rounded-md"
        >
          NO
        </button>
      </div>
    </div>
  );
}
