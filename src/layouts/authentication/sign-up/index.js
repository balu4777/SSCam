/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useState, useRef, useEffect } from "react";

import { useGoogleLogin } from '@react-oauth/google';
import { REGISTER_URL, GOOGLE_SIGNUP_URL } from 'config/CONSTANTS';
import axios from 'axios';
import { toast } from 'react-toastify';



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


function Cover() {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const [errMsg, setErrMsg] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.trim() !== "") {
      setEmailError("");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.trim() !== "") {
      setPasswordError("");
    }
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value.trim() !== "") {
      setFirstNameError("");
    }
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value.trim() !== "") {
      setlastNameError("");
    }
  };

  const handleFisrtNameBlur = () => {
    if (firstName.trim() === "") {
      setFirstNameError(true);
      setErrMsg('First name is required');
    } else {
      setFirstNameError(false);
      setErrMsg('');
    }
  };
  const handleLastNameBlur = () => {
    if (lastName.trim() === "") {
      setlastNameError(true);
      setErrMsg('Last name is required');
    } else {
      setlastNameError(false);
      setErrMsg('');
    }
  };
  const handleEmailBlur = () => {
    if (email.trim() === "") {
      setEmailError("Email is required");
      setErrMsg('Email is required');
    } else {
      setEmailError("");
      setErrMsg('');
    }
  };
  const handlePasswordBlur = () => {
    if (password.trim() === "") {
      setPasswordError(true);
      setErrMsg('Password is required');
    } else {
      setPasswordError(false);
      setErrMsg('');
    }
  };

  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  useEffect(() => {
    const isValid = PWD_REGEX.test(password);
    setValidPwd(isValid);
    setPasswordErrorMsg(isValid ? "" : "Password must be 8-24 characters long and include uppercase, lowercase, number, and special character");
  }, [password]);

  const [emailError, setEmailError] = useState("");
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(email);
    setValidEmail(isValid);
    setEmailError(isValid ? "" : "Invalid email format");
  }, [email]);


  const isFormValid = firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    validEmail &&
    validPwd;

  //focus on the first input field when the component mounts
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });


  // 🔐 Handle Google Login Success
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.credential || tokenResponse.access_token;
      console.log("Google user info:", tokenResponse);

      try {
        const response = await axios.post(
          process.env.REACT_APP_BASE_API_URL + GOOGLE_SIGNUP_URL,
          JSON.stringify({ idToken: tokenResponse.access_token }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        
      } catch (error) {
        console.error("Backend login error:", error);
      }
    },
    onError: () => {
      alert("Google Sign-In failed");
    },
    flow: 'implicit', // or 'auth-code' if backend handles code exchange
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!validEmail) newErrors.email = "Invalid email format";
    if (!validPwd) newErrors.password = "Password doesn't meet criteria";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!isFormValid) {
      setErrMsg("Please correct the errors");
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_API_URL + REGISTER_URL,
        JSON.stringify({ firstName, lastName, email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const message = response?.data?.message || 'Registration successful';
      // ✅ Show success toast
      toast.success(message, { position: "top-right", autoClose: 3000 });
      console.log(JSON.stringify(response?.data));
      // Optionally redirect or clear form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setErrMsg('');
      setFirstNameError(false);
      setlastNameError(false);
      setEmailError('');
      setPasswordError(false);

      // ✅ Redirect after short delay (to allow user to read toast)
      setTimeout(() => {
        window.location.href = "/authentication/sign-in";
      }, 3000); // Wait for toast to show
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data?.message || 'Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current?.focus();
    }
  }
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {errMsg && (
              <p
                ref={errRef}
                tabIndex="-1"
                style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}
              >
                {errMsg}
              </p>
            )}
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="FirstName"
                variant="standard"
                value={firstName}
                onChange={handleFirstNameChange}
                onBlur={handleFisrtNameBlur}
                error={firstNameError}
                helperText={firstNameError ? "First name is required" : ""}
                required
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="LastName"
                variant="standard"
                value={lastName}
                onChange={handleLastNameChange}
                onBlur={handleLastNameBlur}
                error={lastNameError}
                helperText={lastNameError ? "Last name is required" : ""}
                required
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                error={!validEmail}
                helperText={emailError}
                required
                ref={userRef}
                autoComplete="email"
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                error={!validPwd}
                helperText={passwordErrorMsg}
                fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                onClick={handleSubmit}
                disabled={!isFormValid}
                fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
              <MDTypography component="a" variant="button" color="info" >
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MDTypography component={MuiLink} href="#" variant="button" color="info">
                      <FacebookIcon color="inherit" fontSize="inherit" />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      onClick={() => googleLogin()}
                      variant="button"
                      color="info"
                    >
                      <GoogleIcon color="inherit" fontSize="inherit" />
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
