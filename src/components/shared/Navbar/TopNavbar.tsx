/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function TopNavbar({ name }: any) {
  const navigate = useNavigate();

  return (
    <div className="w-full  mx-auto flex text-sm flex-col gap- -mt-3 bg-white-100">
      <div className="w-full flex gap-10 items-center">
        <IoIosArrowBack
          className="cursor-pointer"
          onClick={() => navigate(-1)}
          size={25}
        />

        <h1 className="text-lg font-semibold">{name}</h1>
      </div>
    </div>
  );
}
