import React, { useContext, useEffect, useState } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import './assets/globalStyle/main.scss'; 
import { ThemeContext } from './context/AppTheme';
import { PageTransition } from "@steveeeie/react-page-transition";
import { Toaster } from 'react-hot-toast';

import Onboarding from './pages/Onboarding/Onboarding';
import Code from './pages/Code/Code';
import Redirect from './utils/Redirect';
import Header from './components/Header/Header';
import Interface from './pages/Interface/Interface';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  const location = useLocation();
  const [animation, setAnimation] = useState("moveToLeftFromRight");
  useEffect(() => {
    if(location.pathname === "/admin")  setAnimation("moveToRightFromLeft");
    else{
      setAnimation("moveToLeftFromRight");
    }
  }, [location.pathname]);

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  //console.log("Dark mode : "+isDarkMode)

  return (
    <div className={"App ".concat(isDarkMode ? "darkTheme":"lightTheme")}>
      <Toaster position='top-center'/>
      <Header/>
        <PageTransition preset={animation} transitionKey={location.pathname} enterAnimation="" exitAnimation="">

          <Routes>
              <Route path="/" element={<Redirect to="welcome" />} />
              <Route path="/welcome" element={<Onboarding />}/>
              <Route path="/code" element={<Code/>}/>
              <Route path="/:code" element={<Interface/>}/>
              <Route path="/admin" element={<p className='admin'>Page ADMINNN</p>} />
              <Route path="*/*" element={<p className='PAGE_CONTAINER'>404</p>}/>
          </Routes>

        </PageTransition>
    </div>
  );
}

export default App;