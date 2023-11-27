import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Admindashboard/Main';
import Index from './components/Index';
import Form from './Userdashboard/Form';

function App() {
  return (
   <>

   <Routes>
      <Route path='/' element={<Index/>}></Route>
      <Route path='/dashboard' element={<Main/>}></Route>
      <Route path='/home' element={<Form/>}></Route>
      </Routes>
   </>
     
  );
}

export default App;
