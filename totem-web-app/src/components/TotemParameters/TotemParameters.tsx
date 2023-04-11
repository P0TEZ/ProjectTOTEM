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
		<div className="totemParametersContainer">
			<h1 className="fs-headline-3 c-onBackground monument center bold">Paramètres</h1>
			<div id="totemParameters">
				<h3 className="fs-headline-4 c-grey monument center">
					GROUPE <span className="c-primary">#{props.group}</span>
				</h3>
				<div className="parametersContainer">
					<div className="parameters">
						<Parameter
							value={parameters.volume}
							param_name="volume"
							label="Volume"
							group={props.group}
							max={100}
							setValue={setParameters}
							type="range"
						/>
						<Parameter
							value={parameters.intensite_l}
							param_name="intensite_l"
							label="Intensité gauche"
							group={props.group}
							max={100}
							setValue={setParameters}
							type="range"
						/>
						<Parameter
							value={parameters.intensite_r}
							param_name="intensite_r"
							label="Intensité droite"
							group={props.group}
							max={100}
							setValue={setParameters}
							type="range"
						/>
						<Parameter
							value={parameters.preset}
							param_name="preset"
							label="Preset"
							group={props.group}
							max={10}
							setValue={setParameters}
							type="number"
						/>
						<Parameter
							value={parameters.disabled}
							param_name="disabled"
							label="Désactivé"
							group={props.group}
							max={1}
							setValue={setParameters}
							type="number"
						/>
						<Parameter
							value={parameters.status}
							param_name="status"
							label="Statut"
							group={props.group}
							max={2}
							setValue={setParameters}
							type="number"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
