import React, { useEffect } from "react";
import { useState } from "react";

import "./Status.scss";

export default function Status(props: any) {
	const [statusClass, setStatusClass] = useState("status connecting");

	useEffect(() => {
		switch (props.status) {
			case "Connecté":
				setStatusClass("status connected");
				break;
			case "Déconnecté":
				setStatusClass("status disconnected");
				break;
			default:
				setStatusClass("status connecting");
				break;
		}
	}, [props.status]);

	return (
		<div className="statusContainer" data-aos="fade-down" data-aos-delay="200">
			<h1 className="fs-headline-4">
				<span className="fs-headline-6">N°</span>{" "}
				<strong className="monument">{props.code}</strong>
			</h1>
			<p className="fs-body-1 bold">
				<strong className={statusClass}>{props.status}</strong>
			</p>
		</div>
	);
}
