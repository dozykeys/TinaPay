/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import ScrollToTop from "../utils/ScrollToTop";
import { isTokenExpired } from "../utils/session";
import { Outlet } from "react-router-dom";
import { supabase } from "../constants/supabase";
import { useQuery } from "react-query";

export const UserData = createContext<any>(null);

function UserDataContext() {
  const token = Cookies.get("tinapay_jwt");

  let user: any = null;
  const [recentTrans, setRecentTrans] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState(null);
  const [walletBal, setWalletBal] = useState(null);
  const [notification, setNotification] = useState<any[]>([]);

  const [notiToggle, setNotiToggle] = useState(false);

  const [walData, setWalData] = useState(null);

  const [rate, setRate] = useState(null);

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

  const { data: infoData } = useQuery(
    ["getUserInfo"],
    async () =>
      await supabase.from("user_info").select("*").eq("user_id_fk", user?.id)
  );

  const { data: transData } = useQuery(
    ["getTransactions"],
    async () =>
      await supabase
        .from("transactions")
        .select("*")
        .eq("user_id_fk", user?.id)
        .order("created_at", { ascending: false })
        .limit(5)
  );

  const { data: getWalData } = useQuery(
    ["getWalletBalance"],
    async () =>
      await supabase.from("wallet").select("*").eq("user_id_fk", user?.id)
  );

  const { data: getWalAddr } = useQuery(
    ["getWalletAddress"],
    async () =>
      await supabase
        .from("crypto_wallets")
        .select("*")
        .eq("user_id_fk", user?.id)
  );

  const { data: getRate } = useQuery(
    ["getRates"],
    async () =>
      await supabase
        .from("rates")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
  );

  const { data: getNotification } = useQuery(
    ["getNotification"],
    async () => await supabase.from("notifications").select("*")
  );

  useEffect(() => {
    if (infoData && infoData.data) {
      setUserInfo(infoData?.data[0]);
    }

    if (transData && transData.data) {
      setRecentTrans(transData?.data);
    }

    if (getWalData && getWalData.data) {
      setWalletBal(getWalData?.data[0]);
    }

    if (getWalAddr && getWalAddr.data) {
      setWalData(getWalAddr?.data[0]);
    }

    if (getRate && getRate.data) {
      setRate(getRate?.data[0]);
    }

    if (getNotification && getNotification.data) {
      setNotification(getNotification?.data);
    }
  }, [infoData, transData, getWalAddr, getWalData, getRate]);

  return (
    <UserData.Provider
      value={{
        user,
        recentTrans,
        userInfo,
        walletBal,
        walData,
        token,
        rate,
        notification,
        notiToggle,
        setNotiToggle,
      }}
    >
      <ScrollToTop />
      <Outlet />
    </UserData.Provider>
  );
}

export default UserDataContext;
