import React from "react";
import { Dropdown } from "primereact/dropdown";
import "./PresetSelect.scss";

const presets = ["soft", "hard", "medium", "custom"];

export default function PresetSelect() {
	const [selectedPreset, setSelectedPreset] = React.useState(presets[0]);
	return (
		<div className="w-full dropdownContainer">
			<Dropdown
				value={selectedPreset}
				options={presets}
				onChange={(e) => setSelectedPreset(e.value)}
				placeholder="Selectionnez un preset"
				className="w-full"
			/>
		</div>
	);
}
