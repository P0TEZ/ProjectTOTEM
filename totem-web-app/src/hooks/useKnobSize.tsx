import { useEffect, useState } from "react";

export function useKnobSize() {
	const [knobSize, setKnobSize] = useState(250);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth <= 30) {
				setKnobSize(150);
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
