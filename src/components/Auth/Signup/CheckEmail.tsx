import emailIcon from "../../../assets/auth/checkemail.svg";

export default function CheckEmail() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-2">
      <img src={emailIcon} alt="" />

      <h1 className="text-xl text-center font-bold">Please Check your Mail</h1>
      <p className="text-[#828282] text-center">
        A confirmation link has been sent to your email, check and click on link
        to complete.
      </p>
    </div>
  );
}
