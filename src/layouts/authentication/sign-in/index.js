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

import { useRef, useState, useEffect, use, useContext } from 'react';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { bool } from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LOGIN_URL, GOOGLE_SIGNIN_URL } from 'config/CONSTANTS';
import useAuth from '../../../hooks/useAuth';
import { AuthContext } from 'context/AuthProvider';



function Basic() {
  const { setAccessToken } = useContext(AuthContext);
  //console.log("A!Access Token:", accessToken);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passerror, setPassError] = useState("");


  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error when field has a value
    if (value.trim() !== "") {
      setEmailError("");
    }
  };

  const handlePassChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Clear error when field has a value
    if (value.trim() !== "") {
      setPassError("");
    }
  };

  const handleBlur = () => {
    if (email.trim() === "") {
      setEmailError("Email is required");
    }
  };

  const handlePassBlur = () => {
    if (password.trim() === "") {
      setPassError("Password is required");
    }
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // 🔐 Dummy Email/Password login
  const handleFormLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      alert(`Logged in successfully: ${JSON.stringify(response.data)}`);
      // Save token or session as needed
    } catch (error) {
      alert("Login failed");
    }
  };

  // 🔐 Handle Google Login Success
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.credential || tokenResponse.access_token;
      try {
        const response = await axios.post(
          process.env.REACT_APP_BASE_API_URL + GOOGLE_SIGNIN_URL,
          JSON.stringify({ idToken: tokenResponse.access_token }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }

        );
        //const { accessToken } = response.data.data.accessToken;
        setAccessToken(response.data.accessToken);

        // Redirect to dashboard
        navigate('/dashboard', { replace: true });

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

    try {
      if (email == "" || password == "") {
        setErrMsg('please enter email and password');
        errRef.current.focus();
        return;
      }
      const response = await axios.post(process.env.REACT_APP_BASE_API_URL + LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setAccessToken(response.data.data.accessToken);

      // Clear inputs
      setEmail('');
      setPassword('');

      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data?.message || 'Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="button" color="white">
                <FacebookIcon color="inherit" fontSize="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                onClick={() => googleLogin()}
                variant="button"
                color="white"
              >
                <GoogleIcon color="inherit" fontSize="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="error"
          ref={errRef}
          textAlign="center"
          sx={{ display: errMsg ? 'block' : 'none' }}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </MDTypography>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit} >
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                ref={userRef}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(emailError)}
                value={email}
                required
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                value={password}
                onChange={handlePassChange}
                error={Boolean(passerror)}
                onBlur={handlePassBlur}
                helperText={passerror}
                required
                fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                onSubmit={handleSubmit}
                onClick={handleSubmit}
                fullWidth
              >
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
