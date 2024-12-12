import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
// import Cookies from "js-cookie";

export default function HomeOutlet() {
  // const token = Cookies.get("jwt");

  // const storedItem = JSON.parse(localStorage.getItem("user") || "{}");
  // let user: any;

  // if (
  //   token &&
  //   isTokenExpired(token) === false &&
  //   storedItem &&
  //   storedItem.expiration > new Date().getTime()
  // ) {
  //   user = storedItem.value;
  // } else {
  //   localStorage.removeItem("user");
  //   Cookies.remove("jwt");
  // }

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
