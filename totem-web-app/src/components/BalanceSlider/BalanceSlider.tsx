/** @format */

import "./BalanceSlider.scss";
import { Slider } from "primereact/slider";

interface Props {
	setBalance: (balance: number | [number, number]) => void;
	balance: number | [number, number];
	diff: [number, number];
	disabled?: boolean;
}
/*
 * BalanceSlider component
 * To allow the user to set the balance of the totem
 * @param {function} setBalance - The function to set the balance state
 * @param {number | [number, number]} balance - The balance state
 * @param {[number, number]} diff - The difference between the left and right balance
 * @param {boolean} disabled - If the slider is disabled
 * @returns {JSX.Element} - The BalanceSlider component
 * @see https://www.primefaces.org/primereact/showcase/#/slider
 */
export default function BalanceSlider({ setBalance, balance, diff, disabled }: Props) {
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
					min={-50}
					max={50}
					step={5}
					disabled={disabled}
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
