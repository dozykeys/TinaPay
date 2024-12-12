import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/home";
import SignUp from "./page/auth/signup";
import Login from "./page/auth/login";
import DashBoard from "./page/dashboard";
import UserDataContext from "./context/userDataContext";
import Verify from "./page/auth/verify";
import UserProtectedRoute from "./context/UserProtectedRoute";
import Topup from "./page/dashboard/Topup/Topup";
import Topup_crypto_menu from "./page/dashboard/Topup/Topup_crypto_menu";
import BankDetails from "./page/dashboard/Topup/BankDetails/BankDetails";
import Bills from "./page/dashboard/Bills/Bills";
import NoMatch from "./NoMatch";
import Airtime from "./page/dashboard/Bills/Airtime/Airtime";
import ConfirmAirtime from "./components/dashboard/Bills/Airtime/ConfirmAirtime";
import BillsSuccess from "./components/dashboard/Bills/BillsSuccess";
import ConfirmData from "./components/dashboard/Bills/Data/ConfirmData";
import DataBills from "./page/dashboard/Bills/Data/DataBills";
import Transfer from "./page/dashboard/Transfer/Transfer";
import PayWithCrypto from "./page/dashboard/Transfer/PayWithCrypto";
import PayWithTag from "./page/dashboard/Transfer/PayWithTag";
import PayWithBank from "./page/dashboard/Transfer/PayWithBank";
import TopupTag from "./page/dashboard/Topup/TopupTag/TopupTag";
import Support from "./page/dashboard/Support/Support";
import EmailUs from "./page/dashboard/Support/email_us/EmailUs";
import Profile from "./page/dashboard/Profile/Profile";
import AccountLimit from "./page/dashboard/Profile/AccountLimit/AccountLimit";
import ChangePassword from "./page/dashboard/Profile/ChangePassword/ChangePassword";
import Faq from "./page/home/Faq";
import ChangePin from "./page/dashboard/Profile/ChangePin/ChangePin";
import Settings from "./page/dashboard/Profile/Settings/Settings";
import Rate from "./page/dashboard/Rate/Rate";
import Transaction from "./page/dashboard/Transaction/Transaction";
import Onboarding from "./page/auth/signup/Onboarding";
import TransactionDetail from "./page/dashboard/Transaction/TransactionDetail";
import Notification from "./page/dashboard/Notification/Notification";
import ForgotPassword from "./page/auth/ForgotPassword";
import ResetPassword from "./page/auth/ResetPassword";
import EmailConfirm from "./page/auth/email_confirm/EmailConfirm";
import GiftCards from "./page/dashboard/Giftcards/Giftcards";
import Subscription from "./page/dashboard/Subscription/Subscription";
import SingleGiftCard from "./page/dashboard/Giftcards/SingleGiftCard";
import ContactUs from "./page/contactus/ContactUs";
import Feedback from "./page/feedback/Feedback";
import Whatsapp from "./page/home/Whatsapp";
// import Electricity from "./page/dashboard/Electricity/Electricity";
import AboutUs from "./page/aboutus/AboutUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import ChatMobile from "./page/home/ChatMobile";

function Router() {
  // Route File
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<UserDataContext />}>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/terms_of_service" element={<TermsOfService />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verify" element={<Verify />} />
        <Route path="/auth/forgot_password" element={<ForgotPassword />} />
        <Route path="/auth/onboarding" element={<Onboarding />} />
        <Route path="/auth/email_confirm" element={<EmailConfirm />} />
        <Route path="/email_comfirmation" element={<EmailConfirm />} />
        <Route path="/re8rchat_mobile/:username" element={<ChatMobile />} />

        <Route element={<UserProtectedRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/rate" element={<Rate />} />
          {/* topup */}
          <Route path="/topup" element={<Topup />} />
          <Route path="/topup_crypto_menu" element={<Topup_crypto_menu />} />
          <Route path="/bank_details" element={<BankDetails />} />
          <Route path="/tinapay_tag" element={<TopupTag />} />

          {/* transfer */}
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transfer/pay_with_bank" element={<PayWithBank />} />
          <Route path="/transfer/pay_with_tag" element={<PayWithTag />} />
          <Route path="/transfer/pay_with_crypto" element={<PayWithCrypto />} />

          {/* bills */}
          <Route path="/bills" element={<Bills />} />
          <Route path="/bills/airtime" element={<Airtime />} />
          <Route path="/bills/airtime/confirm" element={<ConfirmAirtime />} />
          <Route path="/bills/data" element={<DataBills />} />
          <Route path="/bills/data/confirm" element={<ConfirmData />} />
          <Route path="/bills/success" element={<BillsSuccess />} />

          {/* support */}
          <Route path="/support" element={<Support />} />
          <Route path="/emailus" element={<EmailUs />} />
          <Route path="/whatsapp" element={<Whatsapp />} />

          {/* profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/account_limit" element={<AccountLimit />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/change_pin" element={<ChangePin />} />
          <Route path="/settings" element={<Settings />} />

          {/* transactions */}
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/transactions/detail" element={<TransactionDetail />} />

          {/* notifications */}
          <Route path="/notifications" element={<Notification />} />

          {/* subscriptions */}
          <Route path="/subscriptions" element={<Subscription />} />

          {/* giftcard */}
          <Route path="/subscriptions/giftcards" element={<GiftCards />} />

          {/* electricity */}
          {/* <Route path="/subscriptions/electricity" element={<Electricity />} /> */}

          <Route
            path="/subscriptions/giftcards/:card"
            element={<SingleGiftCard />}
          />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default Router;
