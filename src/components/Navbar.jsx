import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import logo from 'assets/icons/logo.png';

const NavBar = () => (
// const links = [
//   { path: '/', name: 'Home' },
//   // { path: 'details', name: 'Details' },
// ];
  <nav>
    <img src={logo} alt="logo" />
    {/* <ul> */}
    {/* {links.map((link) => ( */}
    {/* <li key={link.path}> */}
    <input type="text" placeholder="Enter Location" />
    <NavLink
      to="/"
    >
      <AiOutlineHome className="home-icon" />
    </NavLink>
    {/* </li> */}
    {/* ))} */}
    {/* </ul> */}
  </nav>

);
export default NavBar;
