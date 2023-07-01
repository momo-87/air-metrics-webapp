import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <>
    <header>
      <Navbar />
    </header>
    <Outlet />
  </>
);

export default Layout;
