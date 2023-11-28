import React, { useState } from 'react'
import '../Dashboard.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import Student from './Student'
import Batches from './Batches'
import Detail from './Detail'
import Results from './Results'

const Main = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [selectedBatch, setSelectedBatch] = useState(null);

  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleSidebarItemClick = (option, data) => {
    setSelectedOption(option);
    if (option === 'detail') {
      setSelectedBatch(data.batchName);
    }
  };


  return (
      <div className='grid-container'>
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
              onSidebarItemClick={handleSidebarItemClick}
          />

          {selectedOption === 'dashboard' && <Dashboard onSidebarItemClick={handleSidebarItemClick} />}
          {selectedOption === 'students' && <Student />}
          {selectedOption === 'batches' && <Batches onSidebarItemClick={handleSidebarItemClick} />}
          {selectedOption === 'detail' && selectedBatch && <Detail batchName={selectedBatch} /> }
          {selectedOption === 'results' && <Results />}
      </div>
  );
};



export default Main
