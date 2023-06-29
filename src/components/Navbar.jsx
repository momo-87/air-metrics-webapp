import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsArrowBarDown } from 'react-icons/bs';
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
    <div className="search-box">
      <input type="text" placeholder="Enter Location" />
      <BsArrowBarDown className="search-icon" />
    </div>

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
