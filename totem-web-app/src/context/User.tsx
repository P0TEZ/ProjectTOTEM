/** @format */

import React, { createContext, useState, useEffect } from "react";

//create new type for context (is include one int named code and one string named token)
type UserInfo = {
	TotemId: string;
	token: string;
};

// create a context for UserInfo with default value and one function to set the value
const UserContext = createContext<{
	userInfo: UserInfo;
	setTotemId: (code: string) => void;
	setToken: (token: string) => void;
	setAllUserInfo: (userInfo: UserInfo) => void;
}>({
	userInfo: { TotemId: "", token: "" },
	setTotemId: (code: string) => {},
	setToken: (token: string) => {},
	setAllUserInfo: (userInfo: UserInfo) => {},
});

// create a provider for the context
function UserProvider(props: { children: React.ReactNode }) {
	const [userInfo, setUserInfo] = useState<UserInfo>(() => {
		const savedUserInfo = localStorage.getItem("userInfo");
		return savedUserInfo ? JSON.parse(savedUserInfo) : { TotemId: "", token: "" };
	});

	// set the code of the totem
	const setTotemId = (code: string) => {
		setUserInfo({ TotemId: code, token: userInfo.token });
	};

	// set the token of the totem
	const setToken = (token: string) => {
		setUserInfo({ TotemId: userInfo.TotemId, token: token });
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		return new Promise((resolve, reject) => {
			resolve(token);
		});
	};

	// set all the info of the totem at once (code and token)
	const setAllUserInfo = (userInfo: UserInfo) => {
		setUserInfo(userInfo);
	};

	// save the info of the totem in the local storage every time the info (code and token) change
	useEffect(() => {
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
	}, [userInfo]);

	return (
		<UserContext.Provider value={{ userInfo, setTotemId, setToken, setAllUserInfo }}>
			{props.children}
		</UserContext.Provider>
	);
}

export { UserContext, UserProvider };
export type { UserInfo };
