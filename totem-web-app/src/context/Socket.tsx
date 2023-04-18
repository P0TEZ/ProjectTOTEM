/** @format */

import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
	socket: Socket | null;
	lastUpdateTime: Date | null;
	sendUpdated: () => void;
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	lastUpdateTime: null,
	sendUpdated: () => {},
});
SocketContext.displayName = "Socket";

interface SocketProviderProps {
	url: string;
	children: React.ReactNode;
}

function SocketProvider({ children }: SocketProviderProps) {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

	const SOCKET_IP = process.env.REACT_APP_CENTRAL_ADRESS + ":4000";

	useEffect(() => {
		const socket = io(SOCKET_IP, {
			transports: ["websocket"],
		});

		socket.on("connect", () => {
			console.log("Connected to server");
		});

		socket.on("infoUpdated", () => {
			setLastUpdateTime(new Date());
		});

		setSocket(socket);

		return () => {
			socket.disconnect();
		};
	}, [URL]);

	const sendUpdated = () => {
		socket?.emit("updated");
	};

	return (
		<SocketContext.Provider value={{ socket, lastUpdateTime, sendUpdated }}>
			{children}
		</SocketContext.Provider>
	);
}

export { SocketContext, SocketProvider };
