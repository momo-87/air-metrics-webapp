import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import logo from 'assets/icons/logo.png';

const NavBar = () => (
  <nav>
    <img src={logo} alt="logo" />
    <NavLink
      to="/"
    >
      <AiOutlineHome className="home-icon" />
    </NavLink>
  </nav>
);
export default NavBar;
