import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ResetPassword from "./ResetPass";
import "./ForgotPassword.css";
import * as Yup from "yup";
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const ForgotPassword: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

  const sendEmail = (e: any) => {
    e.preventDefault();

    const code = generateCode();
    console.log(code);

    if (form.current) {
      setVerificationCode(code);
      setEmail(form.current["user_email"].value);

      const templateParams = {
        user_email: form.current["user_email"].value,
        code: code,
      };

      emailjs
        .send(
          "service_kgesuns", // Replace with your EmailJS service ID
          "template_c9cpucj", // Replace with your EmailJS template ID
          templateParams,
          "oaX_hpyaICUCgOWHu" // Replace with your EmailJS user ID
        )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          setCodeSent(true);
        })
        .catch((error) => {
          console.error("FAILED...", error);
          alert("Failed to send verification code.");
        });
    }
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (inputCode === verificationCode) {
      setIsCodeCorrect(true);
    } else {
      alert("Incorrect code. Please try again.");
    }
  };
  const validationSchema = Yup.object({
    user_email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
  });

  return (
    <div className="forgot-password-container">
      {!codeSent ? (
        <form ref={form} onSubmit={sendEmail} className="forgot-password-form">
          <label>Email</label>
          <input type="email" name="user_email" required />
          <input type="submit" value="Send Code" />
        </form>
      ) : !isCodeCorrect ? (
        <form onSubmit={verifyCode} className="forgot-password-form">
          <label>Verification Code</label>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            required
          />
          <input type="submit" value="Verify Code" />
        </form>
      ) : (
        <ResetPassword email={email} />
      )}
    </div>
  );
};

export default ForgotPassword;
