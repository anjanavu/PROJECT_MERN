// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Admindashboard/Main';
import Index from './components/Index';
import Form from './Userdashboard/Form';
import { RequireAuth } from './Auth';
import { Logout } from './Logout';
import Results from './Admindashboard/Results';
import Batches from './Admindashboard/Batches';
import Student from './Admindashboard/Student';
import Dashboard from './Admindashboard/Dashboard';
import Detail from './Admindashboard/Detail';

function App() {
  // Define your OpenSidebar function here

  const OpenSidebar = () => {
    // Implement your logic to toggle the sidebar state
    console.log('Sidebar toggled');
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/dashboard/*' element={<RequireAuth><Main OpenSidebar={OpenSidebar}><Dashboard/></Main></RequireAuth>} />
        <Route path='/students/*' element={<RequireAuth><Main OpenSidebar={OpenSidebar}><Student/></Main></RequireAuth>} />
        <Route path='/batches/*' element={<RequireAuth><Main OpenSidebar={OpenSidebar}><Batches/></Main></RequireAuth>} />
        <Route path='/results/*' element={<RequireAuth><Main OpenSidebar={OpenSidebar}><Results/></Main></RequireAuth>} />
        <Route path='/detail/:_id' element={<RequireAuth><Main OpenSidebar={OpenSidebar}><Detail/></Main></RequireAuth>} />

        <Route path='/home' element={<RequireAuth><Form /></RequireAuth>} />
      </Routes>
    </>
  );
}

export default App;
