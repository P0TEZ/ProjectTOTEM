import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Interface.scss";

import Status from "../../components/Status/Status";
import KnobComponent from "../../components/Knob/Knob";
import PresetSelect from "../../components/PresetSelect/PresetSelect";

import { UserContext } from "../../context/User";

import { IoHandRight } from "react-icons/io5";
import { toast } from "react-hot-toast";

function Interface(props: any) {
	const navigate = useNavigate();
	const [status, setStatus] = useState("Connexion");
	const [helpAsked, setHelpAsked] = useState(false);
	const { userInfo } = React.useContext(UserContext);

	useEffect(() => {
		document.title = "TOTEM";
		// console.log(userInfo)
		if (userInfo.TotemId === "" || userInfo.token === "") {
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

				<PresetSelect />

				<div
					className="helpBtn"
					onClick={() => handleHelp()}
					data-aos="fade-up"
					data-aos-delay="800"
				>
					<IoHandRight
						className={`c-primary fs-headline-2 ${helpAsked && "helpAsked"}`}
					/>
					<p className="fs-body-1 c-primary">Assistance</p>
				</div>
			</div>
		</>
	);
}

export default Interface;
