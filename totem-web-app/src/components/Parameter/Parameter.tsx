import React from "react";

interface Props {
	value: number;
	label: string;
	setValue: (value: number) => void;
}

export default function Parameter(props: Props) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.setValue(parseInt(event.target.value));
	};

	return (
		<div>
			<p>{props.label}</p>
			<input type="range" min={0} max={100} value={props.value} onChange={handleChange} />
		</div>
	);
}
