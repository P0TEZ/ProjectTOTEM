import React from "react";

export const TotemItem = (props: any) => {
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
					<div className="totem-group-name">
						<span className="collapseIcon">{props.icon}</span>
						<h1 className="fs-headline-4 monument c-onBackground center">
							GROUPE <span className="c-primary">#{props.item.totem_id}</span>
						</h1>
					</div>
				</div>
			) : (
				<div
					className={`totem-item ${props.item.totem_id === "newTotem" ? "empty" : ""}`}
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
