/** @format */

import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "./PresetSelect.scss";

// NOTE : CHANGE THESE WITH THE PRESETS FROM THE PD PATCH ACCORDING TO THEIR INDEXES
const presets = ["soft", "hard", "medium", "custom"];

interface Props {
	value: number;
	setValue: (value: number) => void;
	disabled?: boolean;
}

/*
 * PresetSelect component
 * To allow the user to select a preset
 * @param {number} value - The preset state
 * @param {function} setValue - The function to set the preset state
 * @param {boolean} disabled - If the dropdown is disabled
 * @returns {JSX.Element} - The PresetSelect component
 * @see https://www.primefaces.org/primereact/showcase/#/dropdown
 */
export default function PresetSelect({ value, setValue, disabled }: Props) {
	const [selectedPreset, setSelectedPreset] = useState(presets[value]);

	// Function to handle the change of the dropdown
	const handleChange = (e: any) => {
		setSelectedPreset(e.value);
		setValue(presets.indexOf(selectedPreset));
	};

	// useEffect to update the selectedPreset state when the value state changes
	useEffect(() => {
		setSelectedPreset(presets[value]);
	}, [value]);

	// useEffect to update the value state when the selectedPreset state changes
	useEffect(() => {
		setValue(presets.indexOf(selectedPreset));
	}, [selectedPreset]);

	return (
		<div className="w-full dropdownContainer">
			<Dropdown
				value={selectedPreset}
				options={presets}
				onChange={handleChange}
				placeholder="Selectionnez un preset"
				className="w-full"
				disabled={disabled}
			/>
		</div>
	);
}
