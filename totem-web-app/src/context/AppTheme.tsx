/** @format */

import React, { useEffect, useState } from "react";

const ThemeContext = React.createContext({ isDarkMode: false, toggleTheme: () => {} });
ThemeContext.displayName = "AppTheme";

/*
 * AppThemeProvider component
 * To provide the theme context to the app
 * @param {ReactNode} children - The children of the component
 * @returns {JSX.Element} - The AppThemeProvider component
 */
function AppThemeProvider(props: { children: React.ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem("isDarkMode");
		return savedTheme ? JSON.parse(savedTheme) : true;
	});

	// Save the theme in the local storage
	useEffect(() => {
		localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
	}, [isDarkMode]);

	// Toggle the theme
	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
		console.debug("toggleTheme: ", isDarkMode);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export { ThemeContext, AppThemeProvider };
