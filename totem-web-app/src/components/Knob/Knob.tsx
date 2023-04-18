/** @format */

import React from "react";
import { Knob } from "primereact/knob";
import "./Knob.scss";
import { useKnobSize } from "../../hooks/useKnobSize";

import {
	TbCellSignal1,
	TbCellSignal2,
	TbCellSignal3,
	TbCellSignal4,
	TbCellSignal5,
} from "react-icons/tb";

interface Props {
	value: number;
	setValue: (value: number) => void;
	disabled?: boolean;
}

/*
 * Knob component
 * To allow the user to set the volume of the totem
 * @param {number} value - The volume state
 * @param {function} setValue - The function to set the volume state
 * @param {boolean} disabled - If the knob is disabled
 * @returns {JSX.Element} - The Knob component
 * @see https://www.primefaces.org/primereact/showcase/#/knob
 */
export default function KnobComponent({ value, setValue, disabled }: Props) {
	const knobSize = useKnobSize();

	// Function to return the correct icon depending on the value
	const volumeIcon = () => {
		var classTmp = "center c-grey fs-headline-4 knob-icon";
		if (value === 0) {
			return <TbCellSignal1 className={classTmp} />;
		} else if (value > 0 && value <= 25) {
			return <TbCellSignal2 className={classTmp} />;
		} else if (value > 25 && value <= 50) {
			return <TbCellSignal3 className={classTmp} />;
		} else if (value > 50 && value <= 75) {
			return <TbCellSignal4 className={classTmp} />;
		} else if (value > 75 && value <= 100) {
			return <TbCellSignal5 className={classTmp} />;
		}
	};

	return (
		<div id="knobContainer">
			<Knob
				value={value}
				size={knobSize}
				onChange={(e) => {
					setValue(e.value);
				}}
				disabled={disabled}
			/>
			{volumeIcon()}
		</div>
	);
}
