import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// MUI
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Theme
import theme from "assets/theme";

// Components
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";

// Routes
import routes from "routes";

export default function App() {
  const [miniSidenav, setMiniSidenav] = useState(false);
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  // Pages where sidenav should be hidden
  const isAuthPage =
    pathname === "/authentication/sign-in" || pathname === "/authentication/sign-up";

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(true);
      setOnMouseEnter(false);
    }
  };

  const renderRoutes = (allRoutes) =>
    allRoutes.map(({ route, component, collapse }) => {
      if (collapse && Array.isArray(collapse)) {
        return renderRoutes(collapse);
      }
      return route && component && <Route path={route} element={component} key={route} />;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isAuthPage && (
        <Sidenav
          color="info"
          brandName="Secure Cam"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
      <Routes>
        {renderRoutes(routes)}
        <Route path="/" element={<Navigate to="/authentication/sign-in" />} />
        <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
      </Routes>
    </ThemeProvider>
  );
}
