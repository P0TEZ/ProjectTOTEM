import { useState, useEffect } from "react";
import { IoHandRight } from "react-icons/io5";

import { toast } from "react-hot-toast";

export const HelpBtn = () => {
	const [helpAsked, setHelpAsked] = useState(false);

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
		<div className="helpBtn" onClick={handleHelp} data-aos="fade-up" data-aos-delay="800">
			<IoHandRight className={`c-primary fs-headline-2 ${helpAsked && "helpAsked"}`} />
			<p className="fs-body-1 c-primary">Assistance</p>
		</div>
	);
};
