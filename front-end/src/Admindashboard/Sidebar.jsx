import React from 'react';
import { Clear } from '@mui/icons-material';
import {  BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill, BsMenuButtonWideFill } from 'react-icons/bs';

const Sidebar = ({ openSidebarToggle, OpenSidebar, onSidebarItemClick  }) => {
    console.log('OpenSidebar type:', typeof OpenSidebar);
    const handleSidebarToggle = () => {
    OpenSidebar();
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        {/* <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> SHOP
        </div> */}
                <span className='' onClick={handleSidebarToggle}>
          <Clear />
        </span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item' onClick={() => onSidebarItemClick('dashboard')}>
          <BsGrid1X2Fill className='icon' /> Dashboard
        </li>
        <li className='sidebar-list-item' onClick={() => onSidebarItemClick('batches')}>
          <BsFillGrid3X3GapFill className='icon' /> Batches
        </li>
        <li className='sidebar-list-item' onClick={() => onSidebarItemClick('students')}>
          <BsPeopleFill className='icon' /> Students
        </li>
        {/* <li className='sidebar-list-item'>
          <BsListCheck className='icon' /> Inventory
        </li> */}
        <li className='sidebar-list-item' onClick={() => onSidebarItemClick('results')}>
          <BsMenuButtonWideFill className='icon' /> Results
        </li>
        {/* <li className='sidebar-list-item'>
          <BsFillGearFill className='icon' /> Setting
        </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
