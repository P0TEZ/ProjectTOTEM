/** @format */

import { useState } from "react";
import TotemList from "../TotemList/TotemList";
import TotemParameters from "../TotemParameters/TotemParameters";
import "./AdminDashboard.scss";
/*
 * AdminDashboard component
 * To allow admin to manage the totems
 * @param {number} selectedGroup - The group selected by the admin
 * @param {function} setSelectedGroup - The function to set the selected group
 * @param {number} totemCount - The number of totems connected
 * @param {function} setTotemCount - The function to set the number of totems connected
 * @returns {JSX.Element} - The AdminDashboard component
 */
export default function AdminDashboard() {
	const [selectedGroup, setSelectedGroup] = useState<number>(1);
	const [totemCount, setTotemCount] = useState<number>(1000);

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
						<TotemList
							selectedGroup={selectedGroup}
							setGroup={setSelectedGroup}
							setTotemCount={setTotemCount}
						/>
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
