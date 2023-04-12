import React from "react";
import { Knob } from "primereact/knob";

export default function KnobComponent() {
	const [value, setValue] = React.useState(50);
	return (
		<div>
			<Knob
				value={value}
				size={200}
				onChange={(e) => {
					setValue(e.value);
				}}
			/>
		</div>
	);
}
