/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "../../../constants/supabase";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface Props {
  setSignState: (signState: boolean) => void;
}

export default function SignOutModal({ setSignState }: Props) {
  const signOut = async () => {
    setSignState(false);
    try {
      await supabase.auth.signOut();

      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
          Logout successful
        </div>
      );
      localStorage.removeItem("tinapay_user");
      Cookies.remove("tinapay_jwt");
      window.location.href = "/auth/login";
    } catch (error: any) {
      console.error("Error logging out:", error.message);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="md:w-2/5 lg:w-1/5 mx-5 fixed top-16 md::top-20 border border-tinaColor  z-50 right-0 flex flex-col bg-white shadow-lg rounded-xl pointer-events-auto">
      <div className="absolute top-2 end-2">
        <button
          onClick={() => setSignState(false)}
          type="button"
          className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent "
          data-hs-overlay="#hs-sign-out-alert-small-window"
        >
          <span className="sr-only">Close</span>
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>

      <div className="p-4 sm:p-10 text-center overflow-y-auto">
        <span className="mb-4 inline-flex justify-center items-center size-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
          <svg
            className="flex-shrink-0 size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
          </svg>
        </span>

        <h3 className="mb-2 text-2xl font-bold text-gray-800">Sign out</h3>
        <p className="text-gray-500">
          Are you sure you would like to sign out of your Tinapay account?
        </p>

        <div className="mt-6 grid gap-y-2">
          <button
            onClick={signOut}
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-tinaColor text-white  shadow-sm hover:bg-opacity-85 disabled:opacity-50 disabled:pointer-events-none"
          >
            Sign out
          </button>
          <button
            onClick={() => setSignState(false)}
            type="button"
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-overlay="#hs-sign-out-alert-small-window"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
