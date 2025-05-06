import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const LayoutWithNavbar = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register"];
  const shouldShowNavbar =
    auth && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default LayoutWithNavbar;
