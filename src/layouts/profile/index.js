
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/profile/components/Header";



function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              
            </Grid>
            <Grid item xs={12} xl={4}>
              
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
        </MDBox>
      </Header>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
