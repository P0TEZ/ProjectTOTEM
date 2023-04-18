/** @format */

import React, { ReactNode, useEffect } from "react";

interface Props {
	item: any;
	icon: ReactNode;
	setGroup: (group: number) => void;
	selectedGroup: number;
}

/*
 * TotemItem component
 * To display a TOTEM item (or group) inside the list of TOTEMs
 * @param {any} item - The item to display
 * @param {ReactNode} icon - The icon to display
 * @param {function} setGroup - The function to set the selected group
 * @param {number} selectedGroup - The selected group
 * @returns {JSX.Element} - The TotemItem component
 */
export const TotemItem = (props: Props) => {
	const [selected, setSelected] = React.useState(false);

	// Set the selected state to true if the item is the selected group
	useEffect(() => {
		if (props.item.group) {
			if (props.item.totem_id === props.selectedGroup) {
				setSelected(true);
			} else {
				setSelected(false);
			}
		} else {
			if (props.item.groupe_id === props.selectedGroup) {
				setSelected(true);
			} else {
				setSelected(false);
			}
		}
	}, [props.selectedGroup]);

	// Set the selected group when user clicks on the item
	const handleClick = () => {
		if (props.item.group) {
			if (props.item.id !== "newGroup") {
				props.setGroup(props.item.totem_id);
			}
		} else {
			props.setGroup(props.item.groupe_id);
		}
	};

	return (
		<>
			{props.item.group ? (
				<div onClick={handleClick}>
					<div className={`totem-group-name ${selected && "selected"}`}>
						<span className="collapseIcon">{props.icon}</span>
						<h1 className="fs-headline-4 monument c-onBackground center">
							GROUPE <span className="c-primary">#{props.item.totem_id}</span>
						</h1>
					</div>
				</div>
			) : (
				<div
					className={`totem-item ${props.item.totem_id === "newTotem" ? "empty" : ""} ${
						selected ? "selected" : ""
					}`}
					onClick={handleClick}
				>
					<div className="totem-item-name">
						{props.item.totem_id !== "newTotem" && (
							<span className="status-indicator"></span>
						)}
						<h1 className="fs-headline-4 monument c-primary">
							{props.item.totem_id === "newTotem" ? "Groupe vide" : "TOTEM"}
							{props.item.totem_id !== "newTotem" && (
								<span className="c-onBackground"> #{props.item.totem_id}</span>
							)}
						</h1>
					</div>
					<div className="totem-item-id">
						<p className="fs-subtitle-4 bold c-grey">{props.item.totem_ip}</p>
					</div>
				</div>
			)}
		</>
	);
};
