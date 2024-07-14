import { useState } from "react";
import toast from "react-hot-toast";
import { ChatState } from "../context/ChatProvider";

const useChangePassword = () => {
  const { user } = ChatState();
  const [loading, setLoading] = useState(false);
  const changePassword = async ({ oldPassword, newPassword, confirmPassword }) => {
    console.log(oldPassword, newPassword, confirmPassword);
    const success = handleInputErrors({
      oldPassword,
      newPassword,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Password has been changed successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, changePassword };
};

export default useChangePassword;

function handleInputErrors({ oldPassword, newPassword, confirmPassword }) {
  if (!oldPassword || !newPassword || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  // if(oldPassword !== user.password)

  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (newPassword.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
