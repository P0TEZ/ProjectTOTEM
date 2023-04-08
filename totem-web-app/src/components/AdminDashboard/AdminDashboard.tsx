import React from "react";
import TotemList from "../TotemList/TotemList";

export default function AdminDashboard() {
	return (
		<>
			<h1 className="fs-headline-3 c-red monument center bold">
				Administrateur
			</h1>
			<TotemList />
		</>
	);
}
