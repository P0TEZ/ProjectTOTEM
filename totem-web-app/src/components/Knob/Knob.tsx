import React from "react";
import { Knob } from "primereact/knob";
import "./Knob.scss";
import { useKnobSize } from "../../hooks/useKnobSize";
import useFetchOnChange from "../../hooks/useFetchOnChange";
import useFetchState from "../../hooks/useFetchState";
import { UserContext } from "../../context/User";

import {
	TbCellSignal1,
	TbCellSignal2,
	TbCellSignal3,
	TbCellSignal4,
	TbCellSignal5,
} from "react-icons/tb";

export default function KnobComponent() {
	const knobSize = useKnobSize();
	//const [value, setValue] = React.useState(50);

	const { userInfo } = React.useContext(UserContext);
	let token = userInfo.token;

	var adressToFetchForDefaultValue = "http://" + process.env.REACT_APP_CENTRAL_ADRESS + ":5050";
	adressToFetchForDefaultValue += "/user/param/volume/?token=" + token;
	// const [knobValue, setKnobValue] = React.useState(0);
	const [value, setValue] = useFetchState(adressToFetchForDefaultValue, 0);

	var adress = "http://" + process.env.REACT_APP_CENTRAL_ADRESS + ":5050";
	adress += "/user/param/volume/";

	const [data, loading, error, refetch] = useFetchOnChange(adress, value, token);

	console.log(data, loading, error, refetch);

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
