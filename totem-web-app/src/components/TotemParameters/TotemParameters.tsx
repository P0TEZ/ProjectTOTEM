import React, { useEffect } from "react";
import "./TotemParameters.scss";

import useFetchState from "../../hooks/useFetchState";
import useFetchOnChange from "../../hooks/useFetchOnChangePut";
import { UserContext } from "../../context/User";
import { useBalance } from "../../hooks/useBalance";
import BalanceSlider from "../BalanceSlider/BalanceSlider";
import KnobComponent from "../Knob/Knob";
import PresetSelect from "../PresetSelect/PresetSelect";

interface Props {
	group: number;
}

export default function TotemParameters(props: Props) {
	const { userInfo } = React.useContext(UserContext);
	var token = userInfo.token;

	var adressToFetchForDefaultValue = "http://" + process.env.REACT_APP_CENTRAL_ADRESS + ":5050";
	adressToFetchForDefaultValue += "/admin/group/" + props.group + "/?token=" + token;
	const [value, setValue] = useFetchState(adressToFetchForDefaultValue, {
		volume: 0,
		balance: 50,
		preset: 0,
		disabled: 0,
	});

	// VOLUME
	const [volume, setVolume] = React.useState(50);

	// SET VOLUME
	var adressToFetchForChangeValue = "http://" + process.env.REACT_APP_CENTRAL_ADRESS + ":5050";
	adressToFetchForChangeValue += "/admin/group/param/" + props.group + "/volume/";
	const [data, loading, error, refetch] = useFetchOnChange(
		adressToFetchForChangeValue,
		volume,
		token
	);
	// BALANCE
	const [balance, diff, setBalance] = useBalance();
	// SET BALANCE
	var adressToFetchForChangeBalance = "http://" + process.env.REACT_APP_CENTRAL_ADRESS + ":5050";
	adressToFetchForChangeBalance += "/admin/group/param/" + props.group + "/balance/";
	const [dataBalance, loadingBalance, errorBalance, refetchBalance] = useFetchOnChange(
		adressToFetchForChangeBalance,
		balance as number,
		token
	);

	useEffect(() => {
		console.log("value", value);
		if (value.volume !== undefined && value.volume !== null) {
			setVolume(value.volume);
		}
		if (value.disabled === 1) {
			setVolume(0);
		}
		if (value.balance !== undefined && value.balance !== null) {
			setBalance(value.balance);
		}
	}, [value]);

	return (
		<div className="totemParametersContainer">
			<h1 className="fs-headline-3 c-onBackground monument center bold">Paramètres</h1>
			<div id="totemParameters">
				<h3 className="fs-headline-4 c-grey monument center">
					GROUPE <span className="c-primary">#{props.group}</span>
				</h3>
				<div className="parametersContainer">
					<div className="parameters">
						<KnobComponent value={volume} setValue={setVolume} />
						<BalanceSlider balance={balance} setBalance={setBalance} diff={diff} />
						<PresetSelect />
					</div>
				</div>
			</div>
		</div>
	);
}
