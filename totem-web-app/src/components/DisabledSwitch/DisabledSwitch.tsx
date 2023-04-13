import React from "react";
import { ToggleButton } from "primereact/togglebutton";
import "./DisabledSwitch.scss";

interface Props {
	checked: boolean;
	setChecked: (checked: boolean) => void;
}
export default function DisabledSwitch({ checked, setChecked }: Props) {
	return (
		<div id="switchContainer">
			<ToggleButton
				onLabel="Activé"
				offLabel="Désactivé"
				onIcon="pi pi-check"
				offIcon="pi pi-times"
				checked={!checked}
				onChange={(e) => setChecked(!e.value)}
			/>
			<p className="c-grey fs-body-1 bold">Contrôle par l'utilisateur</p>
		</div>
	);
}
