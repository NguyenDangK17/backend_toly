import { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = ChatState();
  const navigation = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("userInfo");
      localStorage.removeItem("user");
      setUser(null);
      navigation("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
