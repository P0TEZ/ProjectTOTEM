import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Interface.scss";

import Status from "../../components/Status/Status";
import KnobComponent from "../../components/Knob/Knob";
import PresetSelect from "../../components/PresetSelect/PresetSelect";

import { UserContext } from "../../context/User";
import { useBalance } from "../../hooks/useBalance";
import useFetchState from "../../hooks/useFetchState";
import useFetchOnChange from "../../hooks/useFetchOnChange";

import { HelpBtn } from "./HelpBtn";
import BalanceSlider from "../../components/BalanceSlider/BalanceSlider";

function Interface(props: any) {
	const navigate = useNavigate();
	const [status, setStatus] = useState("Connexion");
	const { userInfo } = React.useContext(UserContext);
	let token = userInfo.token;

	useEffect(() => {
		document.title = "TOTEM";
		if (
			userInfo.TotemId === "" ||
			userInfo.token === "" ||
			userInfo.TotemId === undefined ||
			userInfo.token === undefined ||
			userInfo.TotemId === null ||
			userInfo.token === null ||
			userInfo.TotemId === "admin"
		) {
			console.log("Nope !");
			navigate("/code");
		}
		setStatus("Connecté");
	}, [userInfo, navigate]);

	var adressToFetchForDefaultValue = "http://" + process.env.REACT_APP_CENTRAL_ADRESS + ":5050";
	adressToFetchForDefaultValue += "/user/?token=" + token;
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
	adressToFetchForChangeValue += "/user/param/volume/";
	const [data, loading, error, refetch] = useFetchOnChange(
		adressToFetchForChangeValue,
		volume,
		token
	);
	// BALANCE
	const [balance, diff, setBalance] = useBalance();
	// SET BALANCE
	var adressToFetchForChangeBalance = "http://" + process.env.REACT_APP_CENTRAL_ADRESS + ":5050";
	adressToFetchForChangeBalance += "/user/param/balance/";
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
		<>
			<div id="InterfacePage" className="PAGE_CONTAINER">
				<Status code={userInfo.TotemId} status={status} />

				<KnobComponent setValue={setVolume} value={volume} />

				<BalanceSlider setBalance={setBalance} balance={balance} diff={diff} />

				<PresetSelect />

				<HelpBtn />
			</div>
		</>
	);
}

export default Interface;
