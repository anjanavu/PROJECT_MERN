import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Admindashboard/Main';
import Index from './components/Index';
import Form from './Userdashboard/Form';
import { RequireAuth } from './Auth';
import { Logout } from './Logout';

function App() {
  return (
   <>

   <Routes>
      <Route path='/' element={<Index/>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>
      <Route path='/dashboard' element={<RequireAuth><Main/></RequireAuth>}></Route>
      <Route path='/home' element={<RequireAuth><Form/></RequireAuth>}></Route>
      </Routes>
   </>
     
  );
}

export default App;
