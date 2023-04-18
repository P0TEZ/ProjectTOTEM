import { useState, useEffect, useContext } from "react";
import { IoHandRight } from "react-icons/io5";

import { toast } from "react-hot-toast";
import { SocketContext } from "../../context/Socket";
import { UserContext, UserInfo } from "../../context/User";
import React from "react";


export const HelpBtn = () => {
	const [helpAsked, setHelpAsked] = useState(false);
	
	const { userInfo } = React.useContext(UserContext);
	const { socket } = useContext(SocketContext);

	// Assistance
	const handleHelp = () => {
		setHelpAsked(!helpAsked);
		
		if (!helpAsked) {
			// demande d'assistance a envoyer au serveur
			socket?.emit("askForHelp", userInfo.TotemId);
			console.log("Demande d'assistance");
		}
		else {
			// annulation de la demande d'assistance
			socket?.emit("fixHelp", userInfo.TotemId);
		}
	};

	// Si l'admin valide la demande d'assistance
	socket?.on("helpFixed", (totemId: string) => {
		if (totemId === userInfo.TotemId) {
			setHelpAsked(false);
			console.log("Assistance terminée");
		}
	});

	useEffect(() => {
		if (helpAsked) {
			toast.promise(
				new Promise((resolve) => {
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
		<div className="helpBtn" onClick={handleHelp} data-aos="fade-up" data-aos-delay="800">
			<IoHandRight className={`c-primary fs-headline-2 ${helpAsked && "helpAsked"}`} />
			<p className="fs-body-1 c-primary">Assistance</p>
		</div>
	);
};