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
}

export default function KnobComponent({ value, setValue }: Props) {
	const knobSize = useKnobSize();
	//const [value, setValue] = React.useState(50);

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
			/>
			{volumeIcon()}
		</div>
	);
}
