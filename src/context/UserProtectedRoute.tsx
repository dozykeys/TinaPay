import Cookies from "js-cookie";
import ScrollToTop from "../utils/ScrollToTop";
import { isTokenExpired } from "../utils/session";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar/Sidebar";
import AuthNavbar from "../components/shared/Navbar/AuthNavbar";
import Side from "../components/dashboard/Side/Side";
import BottomNavbar from "../components/shared/Navbar/BottomNavbar";

const UserProtectedRoute = () => {
  const token = Cookies.get("tinapay_jwt");

  let user: any = null;

  try {
    const storedItem = JSON.parse(localStorage.getItem("tinapay_user") || "{}");

    if (
      token &&
      isTokenExpired(token) === false &&
      storedItem &&
      storedItem.expiration > new Date().getTime()
    ) {
      user = storedItem.value;
    } else {
      localStorage.removeItem("tinapay_user");
      Cookies.remove("tinapay_jwt");
    }
  } catch (error) {
    // Handle JSON parsing error
    user = null;
    localStorage.removeItem("tinapay_user");
    Cookies.remove("tinapay_jwt");
    console.error("Error parsing JSON from localStorage:", error);
  }

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        replace={true}
        state={{ path: location.pathname }}
      />
    );
  }

  return (
    <div className="w-full">
      <ScrollToTop />

      <div
        className="w-full grid grid-cols-10"
        // style={{ display: "grid", gridTemplateColumns: "20% 55% 25%" }}
      >
        <div className="hidden md:flex lg:col-span-2 md:col-span-3 border-r">
          <Sidebar />
        </div>

        <div className="w-full col-span-10 lg:col-span-8 md:col-span-7 overflow-y-auto">
          <AuthNavbar />
          <BottomNavbar />

          <div className="w-full gap-5 lg:gap-0 grid grid-cols-10 lg:grid-cols-8 md:grid-cols-7">
            <div className="col-span-10 lg:col-span-5 md:col-span-7">
              <Outlet />
            </div>
            <div className="hidden lg:block col-span-10 lg:col-span-3 md:col-span-7">
              <Side />
            </div>
          </div>
          {/* <div className="w-full">
            <Outlet />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProtectedRoute;
