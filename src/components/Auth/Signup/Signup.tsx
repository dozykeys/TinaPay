/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import logo from '../../../assets/auth/logo.svg';
import phone from '../../../assets/auth/phone.svg';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../../constants/supabase';
import Cookies from 'js-cookie';
import { BeatLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import GetDataService from '../../../utils/getData';

type SetToggle = Dispatch<SetStateAction<boolean>>;

export default function Signup({ setToggle }: { setToggle: SetToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [dis, setDis] = useState(true);
  const [dis2, setDis2] = useState(true);
  const [emailUsed, setEmailUsed] = useState(false);

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Test the pattern
  const testPassword = (password: string) => {
    return passwordPattern.test(password);
  };

  const signUp = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    setEmail(email.trim());
    setPassword(password.trim());
    setConfirmPassword(confirmPassword.trim());

    if (emailUsed) {
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
          {emailUsed && 'Email Already In Use'}
        </div>,
      );
      setLoader(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      return;
    }

    if (testPassword(password)) {
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
          {password && 'Password not valid'}
        </div>,
      );

      setLoader(false);
    } else {
      toast.error('All fields are required');
    }

    if (email.trim() === '' || password.trim() === '') {
      toast.error('All fields are required');

      setLoader(false);
    } else {
      if (password === confirmPassword) {
        try {
          setLoader(true);
          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              emailRedirectTo: `${
                import.meta.env.VITE_WEB_URL
              }/auth/email_confirm`,
            },
          });
          setLoader(false);

          console.log(data);

          if (data.user === null) {
            console.log(error);
            setLoader(false);
            localStorage.removeItem('tinapay_user');
            Cookies.remove('tinapay_jwt');
            toast.error(error?.message || '');
            return;
          } else {
            setLoader(false);

            if (data?.user) {
              console.log('registered', data);
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              toast.success('registration completed!');
              setTimeout(() => {}, 1500);
              setToggle(true);
              return;
            } else {
              toast('Already signed up, sign in instead?', {
                iconTheme: {
                  primary: '#fff',
                  secondary: '#e0721e',
                },
              });
            }
          }
        } catch (error) {
          setLoader(false);

          console.error(error);
          return;
        }
      } else {
        toast.error('Your password does not match!');
        return;
      }
    }
  };

  const checkEmail = async () => {
    try {
      await GetDataService.checkTinaEmail(email);
      setEmailUsed(false);
    } catch (error) {
      setEmailUsed(true);
    }
  };

  useEffect(() => {
    checkEmail();
  }, [email]);

  return (
    <div className="w-full bg-[#F8F0E5] flex justify-center gap-5 min-h-screen items-center text-center">
      <div className="md:w-3/5 w-full min-h-screen flex justify-end bg-white">
        <div className="w-full py-10 flex flex-col items-center md:items-end bg-white">
          <Link
            className="cursor-pointer w-full flex flex-col items-center"
            to={'/'}
          >
            <img
              src={logo}
              width={200}
              alt="logo"
              className="mx-auto hidden md:flex"
            />
            <img
              src={logo}
              width={120}
              alt="logo"
              className="mx-auto flex md:hidden"
            />
          </Link>
          <div className="flex md:w-3/5 lg:w-1/2 w-[95%] md:mx-5 flex-col gap-3 md:gap-3 mt-7 md:mt-10">
            <h1 className="text-[#3F622E] font-bold text-xl">Create Account</h1>
            <p className="text-[#828282]">
              Already have an account?
              <Link
                to={'/auth/login'}
                className="text-[#161616] underline underline-offset-2"
              >
                {' '}
                Login Account
              </Link>
            </p>
            {/* <div className="flex md:w-fit md:px-6 w-4/5 mx-auto gap-2 justify-center items-center bg-[#ECECEC] rounded-2xl p-1">
              <img src={google} alt="google" />
              <p className="text-center text-sm">Sign up With Google</p>
            </div> */}

            <form
              action=""
              onSubmit={signUp}
              className="w-full mt-3 space-y-3 text-sm"
            >
              <div className="flex w-full flex-col gap-2 items-start">
                <label htmlFor="email">Email*</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
                />
                {emailUsed && (
                  <p className="text-red-500 text-start">
                    Email already in use
                  </p>
                )}
              </div>
              {/* password */}
              <div className="flex w-full flex-col gap-2 items-start">
                <label htmlFor="password">Password*</label>
                <div className="flex items-center px-2 border w-full justify-between rounded-md border-[#3F622E]">
                  <input
                    placeholder="Enter Password"
                    value={password}
                    type={`${dis ? 'password' : 'text'}`}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded p-2 outline-none"
                  />
                  <div className="cursor-pointer" onClick={() => setDis(!dis)}>
                    {dis ? <IoIosEyeOff size={25} /> : <IoIosEye size={25} />}
                  </div>
                </div>
              </div>
              {/* confirm password */}
              <div className="flex w-full flex-col gap-2 items-start">
                <label htmlFor="password">Confirm Password*</label>
                <div className="flex items-center px-2 border w-full justify-between rounded-md border-[#3F622E]">
                  <input
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    type={`${dis2 ? 'password' : 'text'}`}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded p-2 outline-none"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setDis2(!dis2)}
                  >
                    {dis2 ? <IoIosEyeOff size={25} /> : <IoIosEye size={25} />}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#3F622E] w-full py-5 px-3 md:p-2 text-white rounded"
              >
                {loader ? (
                  <BeatLoader color="#fff" size={10} />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-end md:w-2/5 bg-[#F8F0E5] min-h-screen">
        <h1 className="text-[#3F622E] md:text-4xl lg:text-6xl text-start w-[90%] mx-auto font-extrabold">
          Experience Next Level Trading
        </h1>
        <div className="w-[90%] mx-auto">
          <img src={phone} width={300} alt="phone" />
        </div>
      </div>
    </div>
  );
}
