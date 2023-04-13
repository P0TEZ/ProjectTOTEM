import React from "react";
import TotemList from "../TotemList/TotemList";
import TotemParameters from "../TotemParameters/TotemParameters";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
	const [selectedGroup, setSelectedGroup] = React.useState<number>(1);
	const [totemCount, setTotemCount] = React.useState<number>(1000);

	return (
		<div id="adminDashboard">
			<h1 className="fs-headline-3 c-red monument center bold">PAGE ADMINISTRATEUR</h1>
			{totemCount > 0 ? (
				<>
					<p className="fs-subtitle-1 c-grey bold">
						Il y a actuellement <span className="c-primary">{totemCount}</span> TOTEM(s)
						connecté(s).
					</p>
					<div className="dashboardContainer">
						<TotemList setGroup={setSelectedGroup} setTotemCount={setTotemCount} />
						<TotemParameters group={selectedGroup} />
					</div>
				</>
			) : (
				<div className="dashboardContainer">
					<p className="fs-headline-4 c-red bold">
						Aucun TOTEM n'est connecté pour le moment.
					</p>
				</div>
			)}
		</div>
	);
}