import { TiHome } from "react-icons/ti";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { IoMdGift } from "react-icons/io";

export const navLinks = [
  {
    title: "About",
    path: "/aboutus",
  },
  {
    title: "Features",
    path: "/features",
  },
  {
    title: "Contact",
    path: "/contactus",
  },
  {
    title: "Sign In",
    path: "/auth/login",
  },
  {
    title: "Create Account",
    path: "/auth/signup",
  },
];

export const authNavLinks = [
  {
    title: "Home",
    path: "/dashboard",
    icon: TiHome,
  },

  {
    title: "Support",
    path: "/support",
    icon: IoChatbubbleEllipsesOutline,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: CiUser,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: HiOutlineChartSquareBar,
  },
  {
    title: "Subscriptions",
    path: "/subscriptions",
    icon: IoMdGift,
  },
];
