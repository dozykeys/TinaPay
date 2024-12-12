import copy from "../../../../assets/dashboard/topup/copy.svg";
import QRCode from "react-qr-code";
import CopyToClipboard from "../../../../utils/copy";

export default function BtcModal({ data, setBtcOpen }: any) {
  function closeModal() {
    setBtcOpen(false);
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col w-[90%] md:w-[50%] gap-10 bg-white mx-auto p-5 border-2 rounded-xl min-h-[50vh]">
        <div className="flex justify-between ">
          <h1>BTC WALLET</h1>
          <button onClick={closeModal} className="text-red-600 font-semibold">
            close
          </button>
        </div>

        <div className="flex-col flex gap-2 items-center">
          <div style={{ width: 200, height: "auto" }}>
            <QRCode
              value={data?.btc_wallet_address}
              size={100}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
            />
          </div>

          <h1 className="font-semibold text-[#C2C1C1] text-sm lg:text-lg text-center">
            {data?.btc_wallet_address}
          </h1>

          <img
            src={copy}
            className="w-14"
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => CopyToClipboard(data?.btc_wallet_address)}
          />

          <p>Copy</p>
        </div>
      </div>
    </div>
  );
}
