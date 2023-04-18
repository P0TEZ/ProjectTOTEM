/** @format */

import { useContext, useState } from "react";

import TotemList from "../TotemList/TotemList";
import TotemParameters from "../TotemParameters/TotemParameters";
import Button from "../Button/Button";
import "./AdminDashboard.scss";

import { SocketContext } from "../../context/Socket";

import toast from "react-hot-toast";
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

	const { socket } = useContext(SocketContext);

	// Handle help request from user
	const handleHelpRequest = () => {
		toast(
			(t) => (
				<div className="helpToast">
					<p>
						Le TOTEM <strong className="bold">1234</strong> nécessite de l'aide.
					</p>
					<Button
						className="confirmButton"
						onClick={() => {
							toast.dismiss(t.id);
							// Your code here
						}}
					>
						OK
					</Button>
				</div>
			),
			{
				duration: 8000,
				icon: "🚨",
				position: "bottom-left",
			}
		);
	};

	return (
		<div id="adminDashboard">
			<h1 className="fs-headline-3 c-red monument center bold">PAGE ADMINISTRATEUR</h1>
			<button onClick={handleHelpRequest}>Test</button>
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
