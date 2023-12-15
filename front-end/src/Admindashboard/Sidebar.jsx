import React from 'react';
import { Clear } from '@mui/icons-material';
import {  BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill, BsMenuButtonWideFill } from 'react-icons/bs';

// Sidebar.js
// ... (other imports)

const Sidebar = ({ openSidebarToggle, OpenSidebar, onSidebarItemClick, navigateTo }) => {
  const handleSidebarToggle = () => {
    OpenSidebar();
  };

  const handleSidebarItemClick = (option, data) => {
    
    onSidebarItemClick(option, data);
    navigateTo(option, data);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <span className='' onClick={handleSidebarToggle}>
          <Clear />
        </span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item' onClick={() => handleSidebarItemClick('dashboard')}>
          <BsGrid1X2Fill className='icon' /> Dashboard
        </li>
        <li className='sidebar-list-item' onClick={() => handleSidebarItemClick('batches')}>
          <BsFillGrid3X3GapFill className='icon' /> Batches
        </li>
        <li className='sidebar-list-item' onClick={() => handleSidebarItemClick('students')}>
          <BsPeopleFill className='icon' /> Students
        </li>
        <li className='sidebar-list-item' onClick={() => handleSidebarItemClick('results')}>
          <BsMenuButtonWideFill className='icon' /> Results
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
