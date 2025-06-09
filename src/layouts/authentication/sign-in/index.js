
import { useRef, useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

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

import { useGoogleLogin } from "@react-oauth/google";
import { loginService } from "services/accountServices";
import { googleSignInService } from "services/googleServices";

function Basic() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const emailRef = useRef();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((p) => ({ ...p, [name]: value?.trim() }));
    setError((p) => ({ ...p, [name + "Error"]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setError((p) => ({ ...p, [name + "Error"]: value?.trim() ? "" : `Enter ${name}` }));
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // 🔐 Handle Google Login Success
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const payload = { idToken: tokenResponse.credential || tokenResponse.access_token };
      const res = await googleSignInService(payload, navigate);
    },
    onError: () => {
      alert("Google Sign-In failed");
    },
    flow: "implicit", // or 'auth-code' if backend handles code exchange
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if (email && password) {
      const response = await loginService({ email, password }, navigate);
      // if email or password error comes from API res , we need to set here (setError state)
    } else {
      setError({
        emailError: userDetails?.email ? "" : "Enter email",
        passwordError: userDetails?.password ? "" : "Enter password",
      });
    }
  };

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
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                name="email"
                value={userDetails.email}
                ref={emailRef}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(error.emailError)}
                required
                fullWidth
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="error"
                textAlign="left"
                sx={{ display: error.emailError ? "block" : "none" }}
                className={error.emailError ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {error.emailError}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(error.passwordError)}
                required
                fullWidth
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="error"
                textAlign="left"
                sx={{ display: error.passwordError ? "block" : "none" }}
                className={error.passwordError ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {error.passwordError}
              </MDTypography>
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
