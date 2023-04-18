/** @format */

import "./Header.scss";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/*
 * Header component
 * To display the header of the app
 * @returns {JSX.Element} - The Header component
 */
export default function Header() {
	const navigate = useNavigate();

	// Navigate to the previous page if user clicks on the arrow icon
	const handleClick = () => {
		navigate(-1);
	};
	return (
		<div className="header fs-headline-5 monument c-onBackground">
			{window.location.pathname !== "/welcome" ? (
				<FaChevronLeft
					onClick={handleClick}
					className="header__icon"
					data-aos="fade-right"
				/>
			) : null}
			<p data-aos="fade-down">TOTEM</p>
		</div>
	);
}
