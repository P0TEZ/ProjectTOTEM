import React from "react";
import TotemList from "../TotemList/TotemList";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
	return (
		<div id="adminDashboard">
			<h1 className="fs-headline-3 c-red monument center bold">
				Administrateur
			</h1>
			<TotemList />
		</div>
	);
}
