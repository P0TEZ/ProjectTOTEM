/** @format */

import React from "react";
import { ToggleButton } from "primereact/togglebutton";
import "./DisabledSwitch.scss";

interface Props {
	checked: boolean;
	setChecked: (checked: boolean) => void;
}
/*
 * DisabledSwitch component
 * To allow admin to disable the control of the totem by the user
 * @param {boolean} checked - If the switch is checked
 * @param {function} setChecked - The function to set the switch
 * @returns {JSX.Element} - The DisabledSwitch component
 * @see https://www.primefaces.org/primereact/showcase/#/togglebutton
 */
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
