import React from 'react';
import {Routes, Route/*, useNavigate*/} from 'react-router-dom';
import './assets/globalStyle/main.scss'; 
// import { ThemeContext } from './context/AppTheme';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<p>HOME</p>} />
            <Route path="/:id" element={<p>PAGE Config</p>}/>
            <Route path="/admin" element={<p>PAGE Admin</p>}/>
            <Route path="*" element={<p>404</p>}/>
        </Routes>
    </div>
  );
}

export default App;