import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Menu from './Menu';

export default function MobileHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleShowMenu = () => setShowMenu(!showMenu);
  return (
    <header>
      <h3>
        <Link to='/'>ShulFinder</Link>
      </h3>
      <h3 className='menu-button' onClick={toggleShowMenu}>
        {'\u2261'}
      </h3>
      {showMenu ? <Menu /> : null}
    </header>
  );
}
