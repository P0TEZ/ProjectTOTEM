/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./assets/globalStyle/main.scss";
import { ThemeContext } from "./context/AppTheme";
import { PageTransition } from "@steveeeie/react-page-transition";
import { Toaster } from "react-hot-toast";

import Onboarding from "./pages/Onboarding/Onboarding";
import Code from "./pages/Code/Code";
import Redirect from "./utils/Redirect";
import Header from "./components/Header/Header";
import Interface from "./pages/Interface/Interface";
import Admin from "./pages/Admin/Admin";

import AOS from "aos";
import "aos/dist/aos.css";

import "react-nestable/dist/styles/index.css";
import { SocketContext } from "./context/Socket";

function App() {
	useEffect(() => {
		AOS.init();
	}, []);

	const location = useLocation();
	const [animation, setAnimation] = useState("moveToLeftFromRight");
	useEffect(() => {
		if (location.pathname === "/admin") setAnimation("moveToRightFromLeft");
		else {
			setAnimation("moveToLeftFromRight");
		}
	}, [location.pathname]);

	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	//console.log("Dark mode : "+isDarkMode)

	// use socketProvider

	const { socket, lastUpdateTime, sendUpdated } = useContext(SocketContext);

	return (
		<div className={"App ".concat(isDarkMode ? "darkTheme" : "lightTheme")}>
			<Toaster position="top-center" />
			<Header />
			<PageTransition
				preset={animation}
				transitionKey={location.pathname}
				enterAnimation=""
				exitAnimation=""
			>
				<Routes>
					<Route path="/" element={<Redirect to="welcome" />} />
					<Route path="/welcome" element={<Onboarding />} />
					<Route path="/code" element={<Code />} />
					<Route path="/admin" element={<Admin />} />
					<Route
						path="/help"
						element={
							<p className="PAGE_CONTAINER fs-headline-2 monument center">
								Le code de votre TOTEM se trouve inscrit sur la boîte qui vous a été
								donnée.
								<br />
								<br /> N'hésitez pas à contacter un organisiteur si vous avez besoin
								d'aide.
							</p>
						}
					/>
					<Route path="/:code" element={<Interface />} />
					<Route path="*/*" element={<p className="PAGE_CONTAINER">404</p>} />
				</Routes>
			</PageTransition>
		</div>
	);
}

export default App;
