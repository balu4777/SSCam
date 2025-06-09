// Refactored React Signup Component with Reduced Redundancy

import { useState, useRef, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useGoogleLogin } from "@react-oauth/google";
import { REGISTER_URL, GOOGLE_SIGNUP_URL } from "config/CONSTANTS";
import axios from "axios";
import { toast } from "react-toastify";
import { signupService } from "services/accountServices";
import { googleSignupService } from "services/googleServices";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Cover() {
  const errRef = useRef();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [errMsg, setErrMsg] = useState("");

  const isValid = {
    email: EMAIL_REGEX.test(form.email),
    password: PWD_REGEX.test(form.password),
    firstName: form.firstName.trim() !== "",
    lastName: form.lastName.trim() !== "",
  };

  const isFormValid = Object.values(isValid).every(Boolean);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleBlur = (field) => () => {
    if (!isValid[field]) {
      setErrors((prev) => ({ ...prev, [field]: `${field} is invalid or required` }));
      setErrMsg(`${field} is invalid or required`);
    } else {
      setErrMsg("");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const payload = { idToken: tokenResponse.credential || tokenResponse.access_token };
        await googleSignupService(payload, navigate);
      } catch (error) {
        console.error("Backend login error:", error);
      }
    },
    onError: () => alert("Google Sign-In failed"),
    flow: "implicit",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setErrMsg("Please correct the errors");
      return;
    }
    const { firstName, lastName, email, password } = form;

    try {
      if (isFormValid) {
        const response = await signupService(form, navigate);
      }

      toast.success(response.data?.message || "Registration successful", { autoClose: 3000 });
      setForm({ firstName: '', lastName: '', email: '', password: '' });
      setTimeout(() => (window.location.href = "/authentication/sign-in"), 3000);
    } catch (err) {
      setErrMsg(err.response?.data?.message || 'Registration Failed');
      errRef.current?.focus();
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox variant="gradient" bgColor="info" borderRadius="lg" p={3} textAlign="center">
          <MDTypography variant="h4" color="white">Join us today</MDTypography>
          <MDTypography variant="button" color="white">Enter your email and password to register</MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} component="form" onSubmit={handleSubmit}>
          {errMsg && <p ref={errRef} style={{ color: "red" }}>{errMsg}</p>}
          {["firstName", "lastName", "email", "password"].map((field) => (
            <MDBox mb={2} key={field}>
              <MDInput
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange(field)}
                onBlur={handleBlur(field)}
                error={!!errors[field]}
                helperText={errors[field] || ""}
                fullWidth
              />
            </MDBox>
          ))}
          <MDBox display="flex" alignItems="center">
            <Checkbox />
            <MDTypography variant="button">&nbsp;I agree the&nbsp;
              <MDTypography component="a" href="#" variant="button" color="info" textGradient>
                Terms and Conditions
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mt={4}>
            <MDButton type="submit" color="info" disabled={!isFormValid} fullWidth>
              Sign Up
            </MDButton>
          </MDBox>
          <MDBox mt={3} textAlign="center">
            <MDTypography variant="button">
              Already have an account?
              <MDTypography component={Link} to="/authentication/sign-in" variant="button" color="info">
                &nbsp;Sign In
              </MDTypography>
            </MDTypography>
            <Grid container justifyContent="center" sx={{ mt: 1 }}>
              <Grid item>
                <MuiLink href="#">
                  <FacebookIcon />
                </MuiLink>
              </Grid>
              <Grid item>
                <MuiLink onClick={() => googleLogin()}>
                  <GoogleIcon />
                </MuiLink>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
