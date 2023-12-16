import React from 'react';
import { BsJustify, BsBoxArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

// Header.js
const Header = ({ handleSidebarToggle, title = "Admin" }) => {
  const handleClick = () => {
    console.log('Menu icon clicked');
    handleSidebarToggle();
  };

  return (
    <header className='header'>
      <div className='menu-icon' onClick={handleClick}>
        <BsJustify className='icon_header' />
      </div>
      <div className='header-left'>
        {title}
      </div>
      <div className='header-right'>
        <Link to='/logout'style={{ textDecoration: 'none',color:'black'}}>
          <BsBoxArrowRight className='icon_header' />
        </Link>
      </div>
    </header>
  );
};


export default Header;
