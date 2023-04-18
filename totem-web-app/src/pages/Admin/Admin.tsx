import { useEffect, useState } from "react";

import AdminLogin from "../../components/AdminLogin/AdminLogin";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";

export default function Admin() {
	const [connected, setConnected] = useState<boolean>(false);

	useEffect(() => {
		// change the title of the page
		document.title = "TOTEM - Admin";
	}, []);

	return (
		<div className="PAGE_CONTAINER_WITH_SCROLL" id="AdminPage">
			{connected ? (
				<>
					<AdminDashboard />
				</>
			) : (
				<AdminLogin setConnected={setConnected} />
			)}
		</div>
	);
}
