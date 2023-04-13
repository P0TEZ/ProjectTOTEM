import React, { useEffect } from "react";
import "./TotemParameters.scss";

import Parameter from "../Parameter/Parameter";
import useFetchState from "../../hooks/useFetchState";
import { UserContext } from "../../context/User";
import { useBalance } from "../../hooks/useBalance";
import BalanceSlider from "../BalanceSlider/BalanceSlider";

interface Props {
	group: number;
}

const parameters = {
	volume: {
		type: "range",
		label: "Volume",
		max: 100,
		min: 0,
		default: 0,
	},
	balance: {
		type: "range",
		label: "Balance",
		max: 100,
		min: 0,
		default: 0,
	},
};

export default function TotemParameters(props: Props) {
	const { userInfo } = React.useContext(UserContext);
	const [balance, diff, setBalance] = useBalance();

	const fetchAdressDefault = `http://${process.env.REACT_APP_CENTRAL_ADRESS}:5050/admin/group/${props.group}/?token=${userInfo.token}`;
	const [parameters, setParameters] = useFetchState(fetchAdressDefault, {
		volume: 0,
		balance: 0,
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
						<BalanceSlider balance={balance} setBalance={setBalance} diff={diff} />
					</div>
				</div>
			</div>
		</div>
	);
}
