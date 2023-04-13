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

import { toast } from "react-hot-toast";
import { HelpBtn } from "./HelpBtn";
import BalanceSlider from "../../components/BalanceSlider/BalanceSlider";

function Interface(props: any) {
	const navigate = useNavigate();
	const [status, setStatus] = useState("Connexion");
	const [helpAsked, setHelpAsked] = useState(false);
	const { userInfo } = React.useContext(UserContext);
	let token = userInfo.token;

	// VOLUME
	var adressToFetchForDefaultValue = "http://" + process.env.REACT_APP_CENTRAL_ADRESS + ":5050";
	adressToFetchForDefaultValue += "/user/param/volume/?token=" + token;
	const [value, setValue] = useFetchState(adressToFetchForDefaultValue, 0);
	var adress = "http://" + process.env.REACT_APP_CENTRAL_ADRESS + ":5050";
	adress += "/user/param/volume/";
	const [data, loading, error, refetch] = useFetchOnChange(adress, value, token);
	console.log(data, loading, error, refetch);

	// BALANCE
	const [balance, diff, setBalance] = useBalance();

	useEffect(() => {
		document.title = "TOTEM";
		// console.log(userInfo)
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

	// Assistance
	const handleHelp = () => {
		setHelpAsked(!helpAsked);
		console.log(helpAsked);
	};

	useEffect(() => {
		if (helpAsked) {
			toast.promise(
				new Promise((resolve, reject) => {
					setTimeout(() => {
						setHelpAsked(false);
						resolve("ok");
					}, 5000);
				}),
				{
					loading: "Demande d'assistance en cours...",
					success: <b>Assistance terminée !</b>,
					error: <b>Assistance échouée !</b>,
				}
			);
		}
	}, [helpAsked]);

	return (
		<>
			<div id="InterfacePage" className="PAGE_CONTAINER">
				<Status code={userInfo.TotemId} status={status} />

				<KnobComponent setValue={setValue} value={value} />

				<BalanceSlider setBalance={setBalance} balance={balance} diff={diff} />

				<PresetSelect />

				<HelpBtn handleHelp={handleHelp} helpAsked={helpAsked} />
			</div>
		</>
	);
}

export default Interface;
