import logo from "../../../assets/home/logo.png";
import closeMenu from "../../../assets/navbar/close.svg";
import menu from "../../../assets/navbar/menu.svg";
import { useState } from "react";

import { navLinks } from "../../../constants";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState(0);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <nav className="w-full hidden md:flex  mx-auto p-2 text-white py-4 fixed top-0 z-50 bg-gradient-to-r from-[#677D4B]  to-[#4F7054]">
        <div className="w-4/5 mx-auto flex text-sm items-center justify-between">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-24" />
          </Link>

          <div className="flex gap-4">
            <Link to="/aboutus">About</Link>
            <Link to="/">Features</Link>
            <Link to="/contactus">Contact</Link>
            <h1></h1>
          </div>

          <div className="flex gap-4 items-center">
            <Link
              to={"/auth/login"}
              className="hover:opacity-85 cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              to={"/auth/signup"}
              className="bg-white text-primary hover:opacity-85 cursor-pointer py-1 px-4 rounded"
            >
              Create Account
            </Link>
          </div>
        </div>
      </nav>

      {/* mobile */}

      <div
        className={`${
          !toggle ? "hidden" : "flex"
        } p-6 bg-primary fixed h-screen w-screen z-50`}
      >
        <div className="sm:hidden flex flex-col w-[100%] justify-center items-center text-white">
          <div className="absolute top-0 right-0 p-5 flex flex-row items-center justify-between w-[100%]">
            <Link
              to={"/"}
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <img src={logo} alt="logo" className="w-20 h-20 object-contain" />
            </Link>

            <img
              src={closeMenu}
              alt="menu"
              className="w-[22px] h-[22px] object-contain "
              onClick={() => setToggle(false)}
            />
          </div>

          <ul className="list-none flex justify-center items-center flex-1 flex-col gap-4">
            {navLinks.map((nav, index) => (
              <li
                key={index}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === index
                    ? "text-[#fff] font-extrabold text-xl"
                    : "text-[#fff]"
                }`}
                onClick={() => {
                  setToggle(!toggle);
                  setActive(index);
                }}
              >
                <Link to={`${nav.path}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <nav className="w-full md:hidden fixed top-0 z-30 bg-gradient-to-r from-[#677D4B] to-[#4F7054] flex text-sm items-center justify-between mx-auto py-2 text-white">
        <div className="w-[90%] mx-auto flex justify-between">
          <img src={logo} alt="logo" className="w-28 sm:w-32" />
          <img src={menu} alt="menu" onClick={() => setToggle(true)} />
        </div>
      </nav>
    </>
  );
}
