import React from "react";
import "./TotemParameters.scss";

import Parameter from "../Parameter/Parameter";

export default function TotemParameters() {
	const [volume, setVolume] = React.useState(50);
	const [left, setLeft] = React.useState(50);
	const [right, setRight] = React.useState(50);
	const [disabled, setDisabled] = React.useState(false);

	return (
		<div id="totemParameters">
			<div className="parametersContainer">
				<div className="parameters">
					<Parameter value={volume} setValue={setVolume} label="volume" />
				</div>
			</div>
		</div>
	);
}
