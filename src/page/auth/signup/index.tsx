import { useContext, useEffect, useState } from "react";
import CheckEmail from "../../../components/Auth/Signup/CheckEmail";
import SignupCmp from "../../../components/Auth/Signup/Signup";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../../context/userDataContext";

export default function SignUp() {
  const { user } = useContext(UserData);
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <main className="flex min-h-screen gap-10 flex-col items-center justify-between">
      {toggle ? <CheckEmail /> : <SignupCmp setToggle={setToggle} />}
    </main>
  );
}
