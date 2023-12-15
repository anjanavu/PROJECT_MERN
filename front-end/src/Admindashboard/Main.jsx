import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Student from './Student';
import Batches from './Batches';
import Detail from './Detail';
import Results from './Results';

const Main = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [selectedBatch, setSelectedBatch] = useState(null);
  const navigate = useNavigate(); // Add this line
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleSidebarItemClick = (option, data) => {
    console.log('Selected Option:', option);
    console.log('Selected Data:', data);
    setSelectedOption(option);
    if (option === 'detail') {
      setSelectedBatch(data._id);
      navigate('detail', { batchId: data._id });
    } else {
      navigate(option);
    }
  };

  const navigateTo = (option, data) => {
    // Your navigation logic here (e.g., using react-router)
    // Implement the logic based on the routing library you are using
    console.log(`Navigating to: ${option}`);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        onSidebarItemClick={handleSidebarItemClick}
        navigateTo={navigateTo} 
      />

      {selectedOption === 'dashboard' && <Dashboard onSidebarItemClick={handleSidebarItemClick} />}
      {selectedOption === 'students' && <Student />}
      {selectedOption === 'batches' && <Batches onSidebarItemClick={handleSidebarItemClick} />}
      {selectedOption === 'detail' && selectedBatch && <Detail _id={selectedBatch} />}
      {selectedOption === 'results' && <Results />}
    </div>
  );
};

export default Main;