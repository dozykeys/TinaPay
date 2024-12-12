/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from '../../../assets/auth/logo.svg';
import phone from '../../../assets/auth/phone.svg';
import { supabase } from '../../../constants/supabase';
import Cookies from 'js-cookie';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

interface Props {
  resendEmail: () => void;
}

export default function Login({ resendEmail }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [dis, setDis] = useState(true);

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Test the pattern
  const testPassword = (password: string) => {
    return passwordPattern.test(password);
  };

  const signIn = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    if (testPassword(password)) {
      toast.custom(
        <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
          {password && 'Password not valid'}
        </div>,
      );
    }

    if (email.trim() === '' || password.trim() === '') {
      toast.error('All fields are required');

      setLoader(false);
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (data.user == null) {
        console.log({ error });
        // toast.error(error?.message || "");

        if (
          error?.message.toLowerCase() == 'Email not confirmed'.toLowerCase()
        ) {
          localStorage.setItem('tinapay_resend_email', email);

          setLoader(false);
          localStorage.removeItem('tinapay_user');
          Cookies.remove('tinapay_jwt');
          resendEmail();
          return;
        }

        toast.custom(
          <div className="bg-gray-800 py-2 px-8 font-semibold text-red-600">
            <>{error?.message || ''}</>
          </div>,
        );

        setLoader(false);
        localStorage.removeItem('tinapay_user');
        Cookies.remove('tinapay_jwt');
        return;
      } else {
        let { data: data2 } = await supabase
          .from('user_info')
          .select('*')
          .eq('user_id_fk', data.user.id);

        if ((data2 as any)[0]?.banned === true) {
          setLoader(false);
          return toast.error('Account Suspened');
        } else {
          toast.custom(
            <div className="bg-gray-800 py-2 px-8 font-semibold text-yellow-400">
              Login successful
            </div>,
          );

          const now = new Date().getTime();
          const localStorageTime = now + 24 * 60 * 60 * 1000;
          console.log(data);
          const token = data.session.access_token;
          // // Set cookie for 24 hours
          Cookies.set('tinapay_jwt', token);

          // store user
          const user = data.user;
          const itemWithExpiration = {
            value: user,
            expiration: localStorageTime,
          };
          localStorage.setItem(
            'tinapay_user',
            JSON.stringify(itemWithExpiration),
          );

          // setTimeout(() => {
          //   setLoader(false);
          // }, 1000);

          // navigate("/dashboard");

          window.location.href = '/dashboard';
        }
      }
    }
  };

  return (
    <div className="w-full bg-[#F8F0E5] flex justify-center gap-5 min-h-screen items-center text-center">
      <div className="md:w-3/5 w-full min-h-screen bg-white flex justify-end">
        <div className="w-full py-10 flex flex-col items-center md:items-end">
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
          <div className="flex md:w-3/5 lg:w-1/2 w-[95%] md:mx-5 flex-col gap-3 mt-10">
            <h1 className="text-[#3F622E] font-bold text-xl">Login Account</h1>
            <p className="text-[#828282]">
              Don’t have an account?{' '}
              <Link
                to={'/auth/signup'}
                className="text-[#161616] underline underline-offset-2"
              >
                Create Account
              </Link>
            </p>
            {/* <div className="flex md:w-fit md:px-6 w-4/5 mx-auto gap-2 justify-center items-center bg-[#ECECEC] rounded-2xl p-1">
              <img src={google} alt="google" />
              <p className="text-center text-sm">Sign up With Google</p>
            </div> */}

            <form
              action=""
              onSubmit={signIn}
              className="w-full mt-3 space-y-3 text-sm"
            >
              <div className="flex w-full flex-col gap-2 items-start">
                <label htmlFor="email">Email*</label>
                <input
                  required
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
                />
              </div>
              {/* <div className="flex w-full flex-col gap-2 items-start">
                <label htmlFor="password">Password*</label>
                <input
                  required
                  type={`${dis ? 'password' : 'text'}`}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E]"
                />
                <div className="cursor-pointer" onClick={() => setDis(!dis)}>
                    {dis ? <IoIosEyeOff size={25} /> : <IoIosEye size={25} />}
                  </div>
              </div> */}

              <div className="flex w-full flex-col gap-2 items-start relative">
                <label htmlFor="password">Password*</label>
                <input
                  required
                  type={`${dis ? 'password' : 'text'}`}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="outline-none border-[1px] w-full p-3 md:p-2 rounded-md border-[#3F622E] pr-10"
                />
                <div
                  className="absolute right-3 top-[70%] transform -translate-y-[50%] cursor-pointer"
                  onClick={() => setDis(!dis)}
                >
                  {dis ? <IoIosEyeOff size={25} /> : <IoIosEye size={25} />}
                </div>
              </div>

              <Link to={'/auth/forgot_password'}>
                <p className="text-end text-[14px] hover:opacity-80 mt-4 mb-1 text-xs font-semibold underline unde text-[#3F622E]">
                  Forgot Password?
                </p>
              </Link>

              <button
                type="submit"
                className="bg-[#3F622E] w-full py-5 px-3 md:p-2 text-white rounded"
              >
                {loader ? (
                  <BeatLoader color="#fff" size={10} />
                ) : (
                  'Login Account'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-end md:w-2/5 bg-[#F8F0E5]">
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
