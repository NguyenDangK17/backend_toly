import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import useSignup from "../../hooks/useSignup";

interface SignUpInputs {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  pic: string;
  coverPic: string;
  accountType: string;
  premiumPlan: string;
  position: {
    lat: number;
    lng: number;
  };
}

const SignIn: React.FC = () => {
  const initialValues: SignUpInputs = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    pic: "https://i.pinimg.com/564x/fc/ee/20/fcee204260921b296a0ee2549ccb4e18.jpg",
    coverPic: "",
    accountType: "",
    premiumPlan: "",
    position: {
      lat: 0,
      lng: 0,
    },
  };

  const { loading, signup } = useSignup();
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 10.7941,
    longitude: 106.7216,
    zoom: 16,
  });
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values: SignUpInputs) => {
    console.log("hello:", values);
    console.log("location", currentLocation);
    signup({ ...values, position: currentLocation });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
          setCurrentLocation({ lat: 10, lng: 106 });
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Create an account</h2>
        <p style={{ fontSize: "12px" }}>Welcome to Toly ^^</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group-signup">
              <Field type="text" id="name" name="name" placeholder="Name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group-signup">
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group-signup">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group-signup">
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

            <button type="submit" className="login-submit-btn">
              Sign Up{" "}
              <ArrowRightOutlined
                style={{ marginLeft: "0.5rem", fontWeight: "bold" }}
              />
            </button>
          </Form>
        </Formik>

        <div
          style={{
            width: "108%",
            textAlign: "center",
            borderBottom: "1px solid #ccc",
            lineHeight: "0.1em",
            margin: "20px 0",
          }}
        >
          <span
            style={{
              background: "#f5f5f5",
              padding: "0 10px",
              color: "#243666",
            }}
          >
            or
          </span>
        </div>
        <GoogleButton
          style={{
            background: "#ffffff",
            borderRadius: "5px",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            color: "rgba(0, 0, 0, 0.54)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
            marginLeft: "10px",
          }}
          onClick={() => {
            console.log("Google button clicked");
          }}
        />

        <div className="signin">
          Already have an account?{" "}
          <Link
            className="signin-link"
            to={""}
            onClick={() => (window.location.href = "/login")}
          >
            Log In
          </Link>
        </div>
      </div>

      <div className="login-image">
        <img
          src="https://images.unsplash.com/photo-1552068751-34cb5cf055b3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login Image"
        />
      </div>
    </div>
  );
};

export default SignIn;
