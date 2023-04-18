/** @format */

import React from "react";
import "./Button.scss";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
	onClick?: () => void;
	children?: React.ReactNode;
	icon?: JSX.Element;
	to?: string;
	aos?: { anim: string; offset?: number; delay?: number };
	label?: string;
	onlyIcon?: boolean;
	outlined?: boolean;
	style?: React.CSSProperties;
	className?: string;
};
/*
 * Button component
 * To display a button and attach a function or route to it
 * @param {function} onClick - The function to execute when the button is clicked
 * @param {JSX.Element} icon - The icon to display in the button
 * @param {string} to - The route to navigate to when the button is clicked
 * @param {string} label - The label to display in the button
 * @param {boolean} onlyIcon - If the button should only display the icon
 * @param {boolean} outlined - If the button should be outlined
 * @param {React.CSSProperties} style - The style of the button
 * @param {string} className - The class of the button
 * @returns {JSX.Element} - The Button component
 */
const Button: React.FC<ButtonProps> = ({
	onClick,
	aos,
	icon,
	to,
	label,
	style,
	outlined,
	onlyIcon,
	children,
	className,
}) => {
	const navigate = useNavigate();
	// If the button has a route, navigate to it, otherwise execute the function passed to it
	const handleClick = () => {
		if (to) {
			navigate(to);
		} else if (onClick) {
			onClick();
		}
	};
	return (
		<button
			className={`btn fs-body-1 s-far ${onlyIcon ? "onlyIcon" : ""} ${
				outlined ? "outlined" : ""
			} ${className ? className : ""}`}
			onClick={handleClick}
			data-aos={aos ? aos.anim : ""}
			data-aos-offset={aos ? aos.offset : 0}
			data-aos-delay={aos ? aos.delay : 0}
			style={style}
		>
			{children && <span className="btn__text bold">{children}</span>}
			{icon && <span className="btn__icon"> {icon}</span>}
			{label && <span className="btn__label bold">{label}</span>}
		</button>
	);
};

export default Button;
