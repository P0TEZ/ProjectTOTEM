import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./context/AppTheme";
import { UserProvider } from "./context/User";

import "react-nestable/dist/styles/index.css";

//theme
import "primereact/resources/themes/viva-dark/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

import { SocketProvider } from "./context/Socket";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<AppThemeProvider>
		<UserProvider>
			<SocketProvider url={""}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</SocketProvider>
		</UserProvider>
	</AppThemeProvider>
);
