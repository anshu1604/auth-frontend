import './App.css';
import Login from '../src/pages/Login';
import Profile from './pages/profile';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Cookies } from './utils/cookies';
import { useState } from 'react';
import SnackBar from './components/atom/SnackBar';
import Page404 from './pages/404';

function App() {

  const [isToken, setIsToken] = useState(new Cookies().read());

  const getToken = () => {
    setIsToken(new Cookies().read());
  }

  return (
    <>
      <BrowserRouter>
        {isToken &&
          <Routes>
            <Route path='*' element={<Navigate replace to='/404' />} />
            <Route path='/404' element={<Page404 />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        }
        {!isToken &&
          <Routes>
            <Route path='*' element={<Navigate replace to='/' />} />
            <Route path='/' element={<Login getToken={getToken} />} />
          </Routes>
        }
      </BrowserRouter>
      <SnackBar />
    </>
  );
}

export default App;
