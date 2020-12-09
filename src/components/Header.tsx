import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const NavList = (): JSX.Element => (
  <nav>
    <ul>
      {/* <li>
        <Link to='/'>Home</Link>
      </li> */}
      {/* <li>
        <Link to='/map'>Map</Link>
      </li> */}
      {/* <li>
        <Link to='/about'>About</Link>
      </li> */}
    </ul>
  </nav>
);

const Header = (): JSX.Element => (
  <header>
    <h3>
      <Link to='/'>ShulFinder</Link>
    </h3>
    <NavList />
    {/* <Search /> */}
  </header>
);

export default Header;
