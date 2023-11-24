import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Admindashboard/Main';
import Index from './components/Index';

function App() {
  return (
   <>

   <Routes>
      <Route path='/' element={<Index/>}></Route>
      <Route path='/dashboard' element={<Main/>}></Route>
      </Routes>
   </>
     
  );
}

export default App;
