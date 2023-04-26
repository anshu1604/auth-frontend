import './App.css';
import Login from '../src/pages/Login';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
