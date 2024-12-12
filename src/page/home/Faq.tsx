import Footer from "../../components/shared/Footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";

export default function Faq() {
  return (
    <>
      <Navbar />
      <div className="w-[95%] md:w-[78%] py-16 mx-auto flex text-sm flex-col gap-5 bg-white-100 ">
        <div className="grid  gap-4 grid-cols-12 text-[#585f4c] md:py-10">
          <h1 className="text-2xl font-bold col-span-12 md:col-span-4">FAQS</h1>

          <div className="flex  col-span-12  md:col-span-8 flex-col gap-5">
            {/* section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">How does TinaPay work?</h1>
              <p>
                Download the app: To download TinaPay, go to the App Store (for
                iOS devices) or Google Play Store (for Android devices), search
                for "TinaPay" and tap the "Install" button. Install the app:
                Wait for the app to finish downloading, and then tap "Open" to
                launch it.
              </p>
              <p>
                Sign up: Tap the "Sign up" button and provide the required
                information, such as your email address, phone number, and
                password. Follow the prompts to complete the registration
                process. Verify your account: Once you've signed up, you'll need
                to verify your account. TinaPay will send you a verification
                code via SMS or email, which you'll need to enter into the app.
              </p>

              <p>
                And that's it! Once you've signed up and verified your account,
                you can start using TinaPay to send and receive money, top up
                your mobile airtime, pay bills, and more.
              </p>
            </div>

            {/* section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">
                What IDs can I sign up on TinaPay with?
              </h1>
              <p>
                Download the app: To download TinaPay, go to the App Store (for
                iOS devices) or Google Play Store (for Android devices), search
                for "TinaPay" and tap the "Install" button. Install the app:
                Wait for the app to finish downloading, and then tap "Open" to
                launch it.
              </p>
              <p>
                Sign up: Tap the "Sign up" button and provide the required
                information, such as your email address, phone number, and
                password. Follow the prompts to complete the registration
                process. Verify your account: Once you've signed up, you'll need
                to verify your account. TinaPay will send you a verification
                code via SMS or email, which you'll need to enter into the app.
              </p>

              <p>
                And that's it! Once you've signed up and verified your account,
                you can start using TinaPay to send and receive money, top up
                your mobile airtime, pay bills, and more.
              </p>
            </div>

            {/* section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">
                Verify Your TinaPay Account with Government-Issued ID
              </h1>
              <p>
                To get fully verified on TinaPay, you will need to provide some
                form of government-issued identification, such as your National
                Identification Number (NIN), Voter’s card, international
                passport or Drivers license. These documents will be used to
                verify your identity and ensure that your account is secure.
              </p>
            </div>

            {/* section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">
                What is the exchange rate and how is it determined?
              </h1>
              <p>
                The exchange rates for cryptocurrencies on TinaPay are
                determined by a variety of factors, including market demand and
                supply, volatility, trading volume, and global economic events.
                TinaPay works with reputable cryptocurrency exchanges to provide
                real-time, accurate exchange rates that reflect current market
                conditions.
              </p>
              <p>
                TinaPay also takes steps to ensure that exchange rates are
                competitive and fair for users. The exchange rates displayed in
                the app are updated in real-time to reflect the latest market
                conditions, and the platform does not charge any hidden fees or
                markups on crypto transactions.
              </p>
              <p>
                Overall, TinaPay aims to provide a transparent and reliable
                platform for buying, selling, and exchanging cryptocurrencies,
                with exchange rates that are fair and reflect the current market
                conditions.
              </p>
            </div>

            {/* section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">What is Tina Tag?</h1>
              <p>
                Tina Tags are unique identifiers that are linked to your TinaPay
                account. They are designed to make it easier for you to send and
                receive money from other TinaPay users.
              </p>
              <p>
                Instead of having to enter a recipient's bank account details or
                phone number every time you want to send them money, you can
                simply use their Tina Tag. This makes the process faster and
                more convenient, as you don't have to worry about typing in long
                strings of numbers and letters.
              </p>
              <p>
                You can create your own Tina Tag in the TinaPay app, and share
                it with your friends, family, and colleagues to make it easier
                for them to send you money.
              </p>
            </div>

            {/* section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">
                Are my personal details safe?
              </h1>
              <p>
                Yes, your personal details are safe on TinaPay. TinaPay uses
                advanced encryption and security measures to protect your data,
                and will never share your information with third parties without
                your consent.
              </p>
            </div>

            {/* section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">
                How do I reset my password?
              </h1>
              <p>
                To reset your password on TinaPay, simply click on the "Forgot
                Password" link on the login screen and follow the prompts to
                reset your password.
              </p>
            </div>

            {/* section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">
                How do I receive payment?
              </h1>
              <p>
                To receive payments on TinaPay, you can provide the person
                sending you money with your Tina Tag or your crypto wallet
                address.
              </p>
              <p>
                If they have your Tina Tag, they can simply enter it in the
                recipient field when making a payment. If they have your crypto
                address, they can use the address from the TinaPay app to
                transfer money directly to your account.
              </p>
              <p>
                Once a payment has been sent to you, you will receive a
                notification in the TinaPay app. You can then choose to either
                leave the money in your TinaPay account or transfer it to your
                bank account.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
