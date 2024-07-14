import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/verify-email/${token}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Verify Successful", { duration: 5000, id: "Verify" });
      } catch (error) {
        toast.error("Failed", { id: "Failed", duration: 5000 });
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "18rem",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Email Verified Successfully!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
        Your email has been successfully verified.
      </p>
      <button
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = "/login")}
      >
        Continue to Login
      </button>
    </div>
  );
};

export default VerifyEmail;
