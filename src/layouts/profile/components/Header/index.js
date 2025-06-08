import { useState, useEffect,useContext } from "react";
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Styles and assets
import breakpoints from "assets/theme/base/breakpoints";
import backgroundImage from "assets/images/bg-profile.jpeg";

// 👇 Import your profile API
import { getProfile } from "services/accountservice";
import { AccessTime } from "@mui/icons-material";

import {AuthContext}  from "context/AuthProvider";

function Header({ children }) {
  //const accestoken = localStorage.getItem("accessToken");
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [profile, setProfile] = useState(null);
  const { accessToken } = useContext(AuthContext);
  console.log("Access Token:", accessToken);
  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, []);

  // 👇 Fetch Profile on Load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(accessToken);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              alt="profile-image"
              src={profile?.avatarUrl || ""}
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {profile?.name || "User Name"}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {profile?.email || "user@email.com"}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

Header.defaultProps = {
  children: "",
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
