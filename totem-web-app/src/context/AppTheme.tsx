import React, { useEffect, useState } from 'react'

const ThemeContext = React.createContext({isDarkMode: false, toggleTheme: () => {}})
ThemeContext.displayName = 'AppTheme'

function AppThemeProvider(props: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : true;
    });

      useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
      }, [isDarkMode]);

      const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        console.debug("toggleTheme: ", isDarkMode);
    };
    

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
           {props.children}
        </ThemeContext.Provider>
    );
}

export {ThemeContext, AppThemeProvider};