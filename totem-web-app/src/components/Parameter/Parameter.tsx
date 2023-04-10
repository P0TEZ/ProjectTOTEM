import React, { useEffect } from "react";
import useFetchOnChange from "../../hooks/useFetchOnChangePut";
import { UserContext } from "../../context/User";

interface Props {
	value: number;
	label: string;
	param_name: string;
	group: number;
	max: number;
}

export default function Parameter(props: Props) {
	const { userInfo } = React.useContext(UserContext);
	const [value, setValue] = React.useState(props.value);

	const fetchAdressChange = `http://${process.env.REACT_APP_CENTRAL_ADRESS}:5050/admin/group/param/${props.group}/${props.param_name}/${value}/?token=${userInfo.token};`;
	const [data, loading, error, refetch] = useFetchOnChange(
		fetchAdressChange,
		value,
		userInfo.token
	);

	useEffect(() => {
		console.log("data : ", data);
		console.log("loading : ", loading);
		console.log("error : ", error);
	}, [data, loading, error]);

	const handleChange = (e: any) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	return (
		<div>
			<p>{props.label}</p>
			<input type="range" min={0} max={props.max} value={value} onChange={handleChange} />
		</div>
	);
}
