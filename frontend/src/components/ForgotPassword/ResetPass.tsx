import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ResetPassword.css"; // Import the CSS file for styling
import useResetPassword from "../../hooks/useResetPass";

interface ResetPasswordProps {
  email: string;
}

interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ email }) => {
  const initialValues: ResetPasswordInputs = {
    password: "",
    confirmPassword: "",
  };

  const { loading, resetPassword } = useResetPassword();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = (values: ResetPasswordInputs) => {
    console.log(values);
    resetPassword({ email, ...values });
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2>Reset Password</h2>
        <p style={{ fontSize: "12px" }}>Enter your new password.</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="New Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                className="reset-password-submit-btn"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Submitting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
