import React from "react";
import TotemList from "../TotemList/TotemList";
import TotemParameters from "../TotemParameters/TotemParameters";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
	const [selectedGroup, setSelectedGroup] = React.useState<number>(1);

	return (
		<div id="adminDashboard">
			<h1 className="fs-headline-3 c-red monument center bold">Administrateur</h1>
			<div className="dashboardContainer">
				<TotemList setGroup={setSelectedGroup} />
				<TotemParameters group={selectedGroup} />
			</div>
		</div>
	);
}
