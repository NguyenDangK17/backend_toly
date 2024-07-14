import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ChangePass.css";
import useChangePassword from "../../hooks/useChangePassword";

const ChangePass = () => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { loading, changePassword } = useChangePassword();

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form data", values);
    changePassword(values);
    setSubmitting(false);
    resetForm(); // Clear the form
  };

  return (
    <div className="changePass">
      <div className="changePass-container">
        <h2 className="changePass-header">Change Password</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-field">
                <Field
                  type="password"
                  name="oldPassword"
                  placeholder="Input old password"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="error-change-pass"
                />
              </div>
              <div className="form-field">
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="Input new password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="error-change-pass"
                />
              </div>
              <div className="form-field">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-change-pass"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-save-change-pass"
              >
                Save change
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePass;
