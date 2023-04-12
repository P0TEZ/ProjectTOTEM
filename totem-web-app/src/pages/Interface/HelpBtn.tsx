import React from "react";
import { IoHandRight } from "react-icons/io5";

interface HelpBtnProps {
	handleHelp: () => void;
	helpAsked: boolean;
}

export const HelpBtn = (props: HelpBtnProps) => {
	return (
		<div className="helpBtn" onClick={props.handleHelp} data-aos="fade-up" data-aos-delay="800">
			<IoHandRight className={`c-primary fs-headline-2 ${props.helpAsked && "helpAsked"}`} />
			<p className="fs-body-1 c-primary">Assistance</p>
		</div>
	);
};
