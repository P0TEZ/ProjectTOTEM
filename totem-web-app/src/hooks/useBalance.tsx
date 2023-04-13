import { useState, useEffect } from "react";

export function useBalance() {
	const [balance, setBalance] = useState<number | [number, number]>(50);
	const [diff, setDiff] = useState<[number, number]>([0, 0]);

	useEffect(() => {
		if (typeof balance === "number") {
			setDiff([-balance as unknown as number, balance as unknown as number]);
		} else {
			setDiff([Math.abs(5 - balance[0]), Math.abs(5 - balance[1])]);
		}
	}, [balance]);

	return [balance, diff, setBalance] as const;
}
