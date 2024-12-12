import TopNavbar from "../../../../components/shared/Navbar/TopNavbar";

export default function AccountLimit() {
  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={"AccountLimit"} />

      <div className="w-full flex flex-col">
        {/* stripe  gray */}
        <div className="w-full p-4 bg-[#f2f2f2] flex justify-between items-center">
          <h1>Tina Tag</h1>
        </div>

        {/* stripe  white */}
        <div className="w-full p-4 bg-white flex justify-between items-center">
          <h1>Tina Tag (sending & Recieving)</h1>
          <h1 className="font-bold text-end">Unlimited</h1>
        </div>

        {/* stripe  gray */}
        <div className="w-full p-4 bg-[#f2f2f2] flex justify-between items-center">
          <h1>
            TinaPay to other Apps{" "}
            <span className="text-green font-semibold"> (Crypto)</span>
          </h1>
        </div>

        {/* stripe  white */}
        <div className="w-full p-4 bg-white flex justify-between items-center">
          <h1>Crypto to another wallet</h1>
          <h1 className="font-bold text-end">Unlimited</h1>
        </div>

        {/* stripe  white */}
        <div className="w-full p-4 bg-white flex justify-between items-center">
          <h1>Crypto from another wallet</h1>
          <h1 className="font-bold text-end">Unlimited</h1>
        </div>

        {/* stripe  gray */}
        <div className="w-full p-4 bg-[#f2f2f2] flex justify-between items-center">
          <h1>
            TinaPay to other Apps
            <span className="text-green font-semibold"> (Bank Transfer)</span>
          </h1>
        </div>

        {/* stripe  white */}
        <div className="w-full p-4 bg-white flex justify-between items-center">
          <h1>Transfers to other account holders</h1>
          <h1 className="font-bold text-end">N500, 000 Daily</h1>
        </div>

        {/* stripe  white */}
        <div className="w-full p-4 bg-white flex justify-between items-center">
          <h1>Transfer to Personal Account (p2p)</h1>
          <h1 className="font-bold text-end">Unlimited</h1>
        </div>

        {/* stripe  white */}
        <div className="w-full p-4 bg-white flex justify-between items-center">
          <h1>Receiving from Bank Transfer</h1>
          <h1 className="font-bold text-end">N700, 000 Daily</h1>
        </div>

        {/* stripe  white */}
        <div className="w-full p-4 mt-10 bg-white flex justify-between items-center">
          <h1>Maximum balance</h1>
          <h1 className="font-bold text-end">Unlimited</h1>
        </div>
      </div>
    </div>
  );
}
