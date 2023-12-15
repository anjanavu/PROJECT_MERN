import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Main = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const handleSidebarToggle = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header handleSidebarToggle={handleSidebarToggle} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={setOpenSidebarToggle} />
      <main className="main-container">{children}</main>
    </div>
  );
};

export default Main;
