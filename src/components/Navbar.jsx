import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const links = [
    { path: '/', name: 'Home' },
    { path: 'details', name: 'Details' },
    { path: '*', name: 'NotMatch' },
  ];

  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
