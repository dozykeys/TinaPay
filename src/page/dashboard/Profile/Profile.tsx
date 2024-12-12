/* eslint-disable @typescript-eslint/no-unused-vars */
import rImg from '../../../assets/dashboard/support/right.svg';
import redImg from '../../../assets/dashboard/support/lock_red.png';
import lock from '../../../assets/dashboard/profile/lock.svg';
import keyIcon from '../../../assets/dashboard/profile/key.svg';
import userIcon from '../../../assets/dashboard/profile/user.svg';
import caution from '../../../assets/dashboard/profile/caution.svg';
import TopNavbar from '../../../components/shared/Navbar/TopNavbar';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { supabase } from '../../../constants/supabase';
import toast from 'react-hot-toast';
import { UserData } from '../../../context/userDataContext';
import { BeatLoader } from 'react-spinners';
import SignOutModal from '../../../components/shared/Navbar/SignOutModal';

export default function Profile() {
  const { user, userInfo } = useContext(UserData);
  const [loader1, setLoader1] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChangePassword = async () => {
    setLoader1(true);
    const { data } = await supabase.auth.resetPasswordForEmail(user?.email, {
      redirectTo: `${import.meta.env.VITE_WEB_URL}/change_password`,
    });

    if (data) {
      toast.custom(
        <div className="bg-black py-2 px-8 font-semibold text-white border border-yellow-700">
          Password reset link sent to email
        </div>,
      );
      // toast.success("Password reset link sent to email");
    }
    // console.log({ data, error });
    setLoader1(false);
  };

  const handleDeleteAccount = () => {
    toast.custom(
      <div className="bg-black py-2 px-8 font-semibold text-white border border-yellow-700">
        Successfully initialized account deletion request.
      </div>,
    );
  };

  return (
    <div className="w-[95%] md:w-[90%] mx-auto flex text-sm flex-col gap-5 bg-white-100 py-5">
      <TopNavbar name={'Profile'} />

      <div className="w-full py-10 space-y-10 mb-10">
        {/* circle */}
        <div className="w-40 h-40 mx-auto border-4 rounded-full border-green bg-[#f8f0e5] flex justify-center items-center">
          <h1 className="text-4xl font-semibold">
            {userInfo?.first_name?.slice(0, 1)}
            {userInfo?.last_name?.slice(0, 1)}
          </h1>
        </div>

        {/* cards */}
        <div className="w-full md:w-4/5 mx-auto grid grid-cols-1 gap-5">
          {/* card */}
          <NavLink
            to={'/settings'}
            className="w-full flex justify-between p-5 border shadow-xl text-lg hover:bg-[#eef1f3] cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img src={userIcon} className="w-7" alt="" />

              <h1>Basic Information</h1>
            </div>

            <img src={rImg} className="w-5" alt="" />
          </NavLink>

          {/* card */}
          <NavLink
            to={'/account_limit'}
            className="w-full flex justify-between p-5 border shadow-xl text-lg hover:bg-[#eef1f3] cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img src={caution} className="w-7" alt="" />

              <h1>Account Limit</h1>
            </div>

            <img src={rImg} className="w-5" alt="" />
          </NavLink>

          {/* card */}
          <NavLink
            to={'/change_pin'}
            className="w-full flex justify-between p-5 border shadow-xl text-lg hover:bg-[#eef1f3] cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img src={lock} className="w-7" alt="" />

              <h1>Reset Transaction PIN</h1>
            </div>

            <img src={rImg} className="w-5" alt="" />
          </NavLink>

          {/* card */}
          <div
            onClick={handleChangePassword}
            className="w-full flex justify-between p-5 border shadow-xl text-lg hover:bg-[#eef1f3] cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img src={keyIcon} className="w-7" alt="" />

              <h1>
                {loader1 ? (
                  <BeatLoader color="#1b5e20" size={10} />
                ) : (
                  ' Change Password'
                )}
              </h1>
            </div>

            <img src={rImg} className="w-5" alt="" />
          </div>

          {/* card */}
          <div
            onClick={() => setOpenModal(true)}
            className="w-full flex justify-between p-5 border shadow-xl text-lg hover:bg-[#eef1f3] cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img src={redImg} className="w-7" alt="" />

              <h1>Log out</h1>
            </div>

            <img src={rImg} className="w-5" alt="" />
          </div>

          {/* card */}
          <div
            onClick={handleDeleteAccount}
            className="w-full flex justify-between p-5 border shadow-xl text-lg hover:bg-[#eef1f3] cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img src={redImg} className="w-7" alt="" />

              <h1>Delete Account</h1>
            </div>

            <img src={rImg} className="w-5" alt="" />
          </div>
        </div>
      </div>
      {openModal && <SignOutModal setSignState={setOpenModal} />}
    </div>
  );
}
