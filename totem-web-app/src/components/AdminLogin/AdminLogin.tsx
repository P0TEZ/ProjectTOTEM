/** @format */

import React from "react";
import "./AdminLogin.scss";

import Button from "../../components/Button/Button";
import { UserContext } from "../../context/User";

import { BsExclamationTriangle } from "react-icons/bs";

import { toast } from "react-hot-toast";

interface Props {
	setConnected: (connected: boolean) => void;
}
/*
 * AdminLogin component
 * To allow admin to connect to his dashboard
 * @param {function} setConnected - The function to set the connected state
 * @returns {JSX.Element} - The AdminLogin component
 */
export default function AdminLogin(props: Props) {
	const [password, setPassword] = React.useState<string>("");
	const adress = process.env.REACT_APP_CENTRAL_ADRESS + ":5000";
	const { setAllUserInfo } = React.useContext(UserContext);

	// Handle the change of the password input
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	// Handle the connection to the admin dashboard
	const handleConnect = () => {
		toast.promise(connectAdmin(password, adress), {
			loading: "Connexion en cours...",
			success: "Connecté en tant qu'administrateur",
			error: "Erreur lors de la connexion",
		});
	};

	// Connect the admin to the admin dashboard by checking the password with the AUTH api
	const connectAdmin = (password: string, adress: string) => {
		return new Promise((resolve, reject) => {
			fetch("http://" + adress + "/admin/" + password, {
				method: "GET",
			})
				.then((res) => {
					if (!res.ok) {
						setAllUserInfo({ TotemId: "", token: "" });
						props.setConnected(false);
						reject(new Error("Mot de passe administrateur incorrect"));
					} else {
						return res.json();
					}
				})
				.then((res) => {
					if (res.length === 0) {
						setAllUserInfo({ TotemId: "", token: "" });
						props.setConnected(false);
						reject(new Error("Mot de passe administrateur incorrect"));
					} else {
						props.setConnected(true);
						setAllUserInfo({ TotemId: "admin", token: res[0] });
						resolve(true);
					}
				})
				.catch((err) => {
					setAllUserInfo({ TotemId: "", token: "" });
					props.setConnected(false);
					reject(new Error("Erreur lors de la connexion"));
				});
		});
	};

	return (
		<>
			<div id="adminWelcome">
				<div className="texts">
					<BsExclamationTriangle className="c-red fs-headline-1" />
					<h1 className="fs-headline-2 monument c-red">Page admin</h1>
					<h3 className="c-grey center">
						Cette page est réservée à l'organisateur et admnistrateur de l'évenement. Si
						ce n'est pas votre cas, veuillez{" "}
						<a href="/welcome" className="c-red bold">
							cliquer ici.
						</a>
					</h3>
				</div>
			</div>
			<p className="fs-body-1 c-grey center m">
				Entrez le mot de passe administrateur{" "}
				<span className="c-onBackground bold">ici</span> si vous possédez les droits.
			</p>
			<div id="adminLoginCont">
				<div id="adminLogin" className="s-far">
					<input
						type="password"
						placeholder="Mot de passe"
						value={password}
						onChange={handleChange}
						className="input-password fs-body-1"
					/>
					<Button onClick={handleConnect}>Se connecter</Button>
				</div>
			</div>
		</>
	);
}
