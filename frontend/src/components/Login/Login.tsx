import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

interface LogInInputs {
  email: string;
  password: string;
  position: {
    lat: number;
    lng: number;
  };
}

const Login: React.FC = () => {
  const initialValues: LogInInputs = {
    email: "",
    password: "",
    position: {
      lat: 0,
      lng: 0,
    },
  };

  const { loading, login } = useLogin();
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
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: LogInInputs, { setFieldValue }) => {
    if (currentLocation) {
      values.position = currentLocation;
    }

    // Your authentication logic here (e.g., API call to validate credentials)
    // If successful, redirect to the profile page
    // history.push('/profile');
    console.log("Submitted values: ", values);
    login(values.email, values.password, values.position);
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
  }, []);

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <p style={{ fontSize: "12px" }}>
          If you are already a member, easily log in
        </p>

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
        >
          ádasd
        </GoogleButton>

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group-login">
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group-login">
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
            <Link to="/forgot" className="forgot-password">
              <a>Forgot your password?</a>
            </Link>
            <button type="submit" className="login-submit-btn">
              Login
            </button>
          </Form>
        </Formik>

        <div className="signin">
          Don't have an account?{" "}
          <Link className="signin-link" to="/signup">
            Register
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

export default Login;
