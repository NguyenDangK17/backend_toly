import { useState } from "react";
import toast from "react-hot-toast";
import { ChatState } from "../context/ChatProvider";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = ChatState();

  const signup = async ({
    email,
    name,
    password,
    confirmPassword,
    pic,
    coverPic,
    position,
    accountType,
    premiumPlan,
  }) => {
    const success = handleInputErrors({
      email,
      name,
      password,
      confirmPassword,
      pic,
      position,
    });
    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          password,
          confirmPassword,
          pic,
          coverPic,
          position,
          accountType,
          premiumPlan,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        toast.success("Signup successful. Please verify your email before logging in.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  email,
  name,
  password,
  confirmPassword,
  pic,
  position,
}) {
  if (!email || !name || !password || !confirmPassword || !pic || !position) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
