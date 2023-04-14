import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "./PresetSelect.scss";

const presets = ["soft", "hard", "medium", "custom"];

interface Props {
	value: number;
	setValue: (value: number) => void;
}

export default function PresetSelect({ value, setValue }: Props) {
	const [selectedPreset, setSelectedPreset] = useState(presets[value]);

	const handleChange = (e: any) => {
		setSelectedPreset(e.value);
		setValue(presets.indexOf(selectedPreset));
	};

	useEffect(() => {
		setSelectedPreset(presets[value]);
	}, [value]);

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
				disabled={false}
			/>
		</div>
	);
}
