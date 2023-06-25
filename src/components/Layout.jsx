import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <>
    <header>
      <Navbar />
    </header>
    <Outlet />
  </>
);

export default Layout;