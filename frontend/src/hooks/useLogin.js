import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChatState } from "../context/ChatProvider";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = ChatState();

  const login = async (email, password, position) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      const userId = data._id;
      const token = data.token;
      await updatePosition(token, userId, position);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePosition = async (token, userId, position) => {
    try {
      console.log("Updating position with:", { userId, position, token }); // Debug log
      const res = await fetch(`/api/user/update-position/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lat: position.lat, lng: position.lng }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Position updated successfully");
    } catch (error) {
      toast.error("Failed to update position: " + error.message);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
