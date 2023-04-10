import React from "react";
import TotemList from "../TotemList/TotemList";
import TotemParameters from "../TotemParameters/TotemParameters";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
	return (
		<div id="adminDashboard">
			<h1 className="fs-headline-3 c-red monument center bold">Administrateur</h1>
			<div className="dashboardContainer">
				<TotemList />
				<TotemParameters group={1} />
			</div>
		</div>
	);
}
