import "./BalanceSlider.scss";
import { Slider } from "primereact/slider";
import { useBalance } from "../../hooks/useBalance";

export default function BalanceSlider() {
	const [balance, diff, setBalance] = useBalance();

	return (
		<div id="sliderContainer">
			<div className="sliderAndValues fs-body-1">
				<p className="center monument fs-body-1 c-grey diff-left">
					{diff[0] > 0 && "+"}
					{diff[0]}
				</p>
				<Slider
					value={typeof balance === "number" ? balance : [balance[0], balance[1]]}
					onChange={(e) => {
						setBalance(e.value as number | [number, number]);
					}}
					step={5}
				/>
				<p className="center monument fs-body-1 c-grey diff-right">
					{diff[1] > 0 && "+"}
					{diff[1]}
				</p>
			</div>
			<div className="sliderLabels p2">
				<p className="c-primary fs-body-1 bold">Gauche</p>
				<p className="c-primary fs-body-1 bold">Droite</p>
			</div>
		</div>
	);
}
