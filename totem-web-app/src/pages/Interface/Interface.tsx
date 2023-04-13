import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Interface.scss";

import Status from "../../components/Status/Status";
import KnobComponent from "../../components/Knob/Knob";
import PresetSelect from "../../components/PresetSelect/PresetSelect";

import { UserContext } from "../../context/User";
import { useBalance } from "../../hooks/useBalance";

import { toast } from "react-hot-toast";
import { HelpBtn } from "./HelpBtn";
import BalanceSlider from "../../components/BalanceSlider/BalanceSlider";

function Interface(props: any) {
	const navigate = useNavigate();
	const [status, setStatus] = useState("Connexion");
	const [helpAsked, setHelpAsked] = useState(false);
	const { userInfo } = React.useContext(UserContext);

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

				<KnobComponent />

				<BalanceSlider setBalance={setBalance} balance={balance} diff={diff} />

				<PresetSelect />

				<HelpBtn handleHelp={handleHelp} helpAsked={helpAsked} />
			</div>
		</>
	);
}

export default Interface;
