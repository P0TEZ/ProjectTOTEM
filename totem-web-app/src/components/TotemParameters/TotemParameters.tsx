import React, { useEffect } from "react";
import "./TotemParameters.scss";

import Parameter from "../Parameter/Parameter";
import useFetchState from "../../hooks/useFetchState";
import useFetchOnChange from "../../hooks/useFetchOnChange";
import { UserContext } from "../../context/User";

interface Props {
	group: number;
}

export default function TotemParameters(props: Props) {
	const { userInfo } = React.useContext(UserContext);

	const fetchAdressDefault = `http://${process.env.REACT_APP_CENTRAL_ADRESS}:5050/admin/group/${props.group}/?token=${userInfo.token}`;
	const [parameters, setParameters] = useFetchState(fetchAdressDefault, {
		volume: 0,
		intensite_l: 0,
		intensite_r: 0,
		preset: 0,
		disabled: 0,
		status: 0,
	});

	useEffect(() => {
		console.log("Parametres : ", parameters);
	}, [parameters]);

	return (
		<div id="totemParameters">
			<h1 className="fs-headline-3 c-onBackground monument center bold">Paramètres</h1>
			<h3 className="fs-headline-4 c-grey bold center">Groupe {props.group}</h3>
			<div className="parametersContainer">
				<div className="parameters">
					<Parameter
						value={parameters.volume}
						param_name="volume"
						label="volume"
						group={props.group}
						max={100}
					/>
				</div>
			</div>
		</div>
	);
}
