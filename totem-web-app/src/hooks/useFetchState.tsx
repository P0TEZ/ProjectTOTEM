import { useState, useEffect } from "react";

function useFetchState<T>(
	url: string,
	defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [state, setState] = useState<T>(defaultValue);

	useEffect(() => {
		// console.log('Fetching data from URL: ' + url);
		var headers = {};
		fetch(url, {
			method: "GET",
			mode: "cors",
			headers: headers,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.length === 0) {
					// error
					throw new Error("No data");
				}
				if (data[0]) {
					const value = data[0].param_value ? data[0].param_value : data;
					// console.log("lavalue", value)
					setState(value);
				} else {
					setState(data);
				}
			})
			.catch((error) => console.error(error));
	}, [url]);

	// console.log(state);

	return [state, setState];
}

export default useFetchState;
