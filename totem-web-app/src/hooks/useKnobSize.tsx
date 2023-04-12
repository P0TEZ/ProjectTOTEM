import { useEffect, useState } from "react";

export function useKnobSize() {
	const [knobSize, setKnobSize] = useState(250);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth <= 350) {
				setKnobSize(150);
			}
			if (window.innerHeight <= 550) {
				setKnobSize(120);
			}
			if (window.innerHeight <= 650) {
				setKnobSize(90);
			} else {
				setKnobSize(250);
			}
		}

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return knobSize;
}
