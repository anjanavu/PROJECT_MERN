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
  <Route path='/' element={<Index />} />
  <Route path='/logout' element={<Logout />} />
  <Route path='/dashboard/*' element={<RequireAuth><Main selectedOption="dashboard" /></RequireAuth>} />
  <Route path='/students/*' element={<RequireAuth><Main selectedOption="students" /></RequireAuth>} />
  <Route path='/batches/*' element={<RequireAuth><Main selectedOption="batches" /></RequireAuth>} />
  <Route path='/results/*' element={<RequireAuth><Main selectedOption="results" /></RequireAuth>} />
  <Route path='/detail/:batchId/*' element={<RequireAuth><Main selectedOption="detail" /></RequireAuth>} />
  <Route path='/home' element={<RequireAuth><Form /></RequireAuth>} />
</Routes>

    </>
  );
}

export default App;
