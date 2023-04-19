/** @format */

import { useEffect } from "react";
import characterImg from "./../../assets/images/character.png";
import { FaArrowRight } from "react-icons/fa";

import "./Onboarding.scss";

import Button from "./../../components/Button/Button";

export default function Onboarding() {
	useEffect(() => {
		document.title = "TOTEM - Bienvenue";
	}, []);
	const startDelay = 300;
	return (
		<>
			<div id="OnboardingPage" className="PAGE_CONTAINER">
				<div
					className="characterContainer"
					data-aos="zoom-in"
					data-aos-delay={startDelay + 200}
				>
					<img
						src={characterImg}
						alt="A woman walking forward to the right"
						aria-label="A woman walking forward to the right"
						className="character"
					/>
				</div>

				<div className="textContainer">
					<h1
						className="catchPhrase fs-headline-4 bold"
						data-aos="zoom-out"
						data-aos-delay={startDelay + 400}
					>
						<strong className="monument">TOTEM</strong>
						<br />
						La magie de la musique, pour tous·tes.
					</h1>
					<p
						className="fs-body-1 c-lightGrey"
						data-aos="zoom-out"
						data-aos-delay={startDelay + 600}
					>
						Cliquez sur le bouton ci-dessous pour commencer
					</p>
				</div>
				<Button
					aos={{
						anim: "fade-up",
						offset: -200,
						delay: startDelay + 800,
					}}
					icon={<FaArrowRight />}
					to="/code"
				>
					Commencer
				</Button>
			</div>
		</>
	);
}
