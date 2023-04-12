import "./BalanceSlider.scss";
import { Slider } from "primereact/slider";
import { useBalance } from "../../hooks/useBalance";

export default function BalanceSlider() {
	const [balance, diff, setBalance] = useBalance();

	return (
		<div id="sliderContainer">
			<div className="sliderAndValues">
				<p>
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
				<p>
					{diff[1] > 0 && "+"}
					{diff[1]}
				</p>
			</div>
		</div>
	);
}
