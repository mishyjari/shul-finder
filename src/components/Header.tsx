import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const NavList = (): JSX.Element => (
  <nav>
    <ul>
      <li>
        <Link to='/'>List</Link>
      </li>
      <li>
        <Link to='/map'>Map</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </ul>
  </nav>
);

const Header = (): JSX.Element => (
  <header>
    <h3>ShulFinder</h3>
    <NavList />
    <Search />
  </header>
);

export default Header;
