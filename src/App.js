import './App.css';
import Login from '../src/pages/Login';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Cookies } from './utils/cookies';
import { useState } from 'react';

function App() {

  const [isToken, setIsToken] = useState(new Cookies().read());

  const getToken = () => {
    setIsToken(new Cookies().read());
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isToken ? <Dashboard /> : <Navigate replace to={'/login'} />} />
          <Route path='/login' element={<Login getToken={getToken} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
