import { useState, useEffect, useContext} from "react";
import { SocketContext } from "../context/Socket";

function useFetchState<T>(
	url: string,
	defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [state, setState] = useState<T>(defaultValue);
	
	const { socket, lastUpdateTime, sendUpdated} = useContext(SocketContext);

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
	}, [url, lastUpdateTime]);

	// console.log(state);

	return [state, setState];
}

export default useFetchState;
