/* eslint-disable @typescript-eslint/no-explicit-any */
import Ebay from "./ebay.svg";
import AmericaExpress from "./america_express.svg";
import Steam from "./steam.svg";
import Vanilla from "./vanilla.svg";
import Amazon from "./amazon.svg";
import GooglePlay from "./googleplay.svg"; // Make sure the filename matches exactly
import Itunes from "./itunes.svg";
import Razer from "./razer.svg";
import Sephora from "./sephora.svg";
import Target from "./target.svg";

interface GiftCard {
  image: any;
  bgColor: string;
  name: string;
}

export const giftcardImages: GiftCard[] = [
  { image: Steam, bgColor: "bg-[#421C6E]", name: "Steam" },
  { image: Vanilla, bgColor: "bg-[#8D65BB80]", name: "Vanilla" },
  { image: Ebay, bgColor: "bg-[#F4F1D54D]", name: "Ebay" },
  { image: AmericaExpress, bgColor: "bg-[#016FD0]", name: "AmericaExpress" },
  { image: Amazon, bgColor: "bg-[#163452]", name: "Amazon" },
  { image: GooglePlay, bgColor: "bg-[#ffffff]", name: "GooglePlay" },
  { image: Itunes, bgColor: "bg-purple-500", name: "Itunes" },
  { image: Razer, bgColor: "bg-[#000000CC]", name: "Razer" },
  { image: Sephora, bgColor: "bg-[#131212]", name: "Sephora" },
  { image: Target, bgColor: "bg-[#D40A0A]", name: "Target" },
];
