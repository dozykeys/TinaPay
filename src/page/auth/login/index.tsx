import { useContext, useEffect, useState } from "react";
import LoginCmp from "../../../components/Auth/Login/Login";
import { UserData } from "../../../context/userDataContext";
import { useNavigate } from "react-router-dom";
import ResendModal from "../../../components/shared/Modal/ResendModal";

export default function Login() {
  const { user } = useContext(UserData);
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <main className="flex min-h-screen gap-10 flex-col items-center justify-between">
      <LoginCmp
        resendEmail={() => {
          setIsSuccessModalOpen(true);
        }}
      />
      <ResendModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
        }}
      />
    </main>
  );
}
