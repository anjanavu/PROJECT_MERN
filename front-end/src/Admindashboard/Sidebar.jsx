import React from 'react';
import { Clear } from '@mui/icons-material';
import { BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill, BsMenuButtonWideFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const handleSidebarToggle = () => {
    console.log('Sidebar toggled');
    OpenSidebar(!openSidebarToggle);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title' >
        <span className='' onClick={handleSidebarToggle}>
          <Clear />
        </span>
      </div>
      <ul className='sidebar-list'>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li className='sidebar-list-item'>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </li>
        </Link>
        <Link to="/batches" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li className='sidebar-list-item'>
            <BsFillGrid3X3GapFill className='icon' /> Batches
          </li>
        </Link>
        <Link to="/students" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li className='sidebar-list-item'>
            <BsPeopleFill className='icon' /> Students
          </li>
        </Link>
        <Link to="/results" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li className='sidebar-list-item'>
            <BsMenuButtonWideFill className='icon' /> Results
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
