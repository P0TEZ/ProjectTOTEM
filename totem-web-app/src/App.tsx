import React, { useContext, useEffect, useState } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import './assets/globalStyle/main.scss'; 
import { ThemeContext } from './context/AppTheme';
import { PageTransition } from "@steveeeie/react-page-transition";

import Onboarding from './pages/Onboarding/Onboarding';
import Code from './pages/Code/Code';
import Redirect from './utils/Redirect';
import Header from './components/Header/Header';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  const location = useLocation();
  const [animation, setAnimation] = useState("moveToLeftFromRight");
  useEffect(() => {
    if(location.pathname === "/admin")       setAnimation("moveToRightFromLeft");
    else{
      setAnimation("moveToLeftFromRight");
    }
  }, [location.pathname]);

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  console.log(isDarkMode)

  return (
    <div className={"App ".concat(isDarkMode ? "darkTheme":"lightTheme")}>
      <Header/>

        <PageTransition preset={animation} transitionKey={location.pathname} enterAnimation="" exitAnimation="">

          <Routes>
              <Route path="/" element={<Redirect to="welcome" />} />
              <Route path="/welcome" element={<Onboarding />}/>
              <Route path="/code" element={<Code />}/>
              <Route path="/:id" element={<p>PAGE Config</p>}/>
              <Route path="/admin" element={<p className='admin'>Page ADMINNN</p>} />
              <Route path="/*" element={<p>404</p>}/>
          </Routes>

        </PageTransition>
    </div>
  );
}

export default App;