import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Editor from './components/CanvasComponents/Editor';
import Login from './components/LoginComponents/Login';
import Signup from './components/SignUpCompontents/Signup';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/editor' />} />
          <Route path='/editor' element={<Editor />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

