import { useState, useEffect } from "react";

export function useBalance() {
	const [balance, setBalance] = useState<number | [number, number]>(50);
	const [diff, setDiff] = useState<[number, number]>([0, 0]);

	useEffect(() => {
		if (typeof balance === "number") {
			setDiff([
				((50 - balance) / 10).toFixed(1) as unknown as number,
				((balance - 50) / 10).toFixed(1) as unknown as number,
			]);
		} else {
			setDiff([Math.abs(5 - balance[0]), Math.abs(5 - balance[1])]);
		}
	}, [balance]);

	return [balance, diff, setBalance] as const;
}
