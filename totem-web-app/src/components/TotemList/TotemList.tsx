import React, { useEffect } from "react";
import "./TotemList.scss";

import Nestable from "react-nestable";
import { toast } from "react-hot-toast";

import { UserContext } from "../../context/User";

import { BsChevronRight, BsSliders2Vertical } from "react-icons/bs";

export default function TotemList() {
	// get list of totems from the server
	const [items, setItems] = React.useState<any[]>([]);
	const { userInfo } = React.useContext(UserContext);

	useEffect(() => {
		toast.promise(getTotems(), {
			loading: "Chargement des totems...",
			success: "Liste des totems chargée",
			error: "Erreur lors du chargement des totems",
		});
	}, []);

	const getTotems = () => {
		return new Promise((resolve, reject) => {
			fetch(
				"http://" +
					process.env.REACT_APP_CENTRAL_ADRESS +
					":5050/admin/?token=" +
					userInfo.token
			)
				.then((response) => {
					console.log(response);
					if (!response.ok) reject(true);
					return response.json();
				})
				.then((data) => {
					convertToItems(data);
					resolve(true);
				});
		});
	};

	const convertToItems = (data: any) => {
		console.log(data);
		const newItems = data.reduce((acc: any, obj: any) => {
			const key = obj.groupe_id;
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
		console.log(newItems);
		// convert to array
		const items = Object.keys(newItems).map((key) => {
			return {
				totem_id: key,
				id: key,
				group: true,
				children: newItems[key],
			};
		});
		// give each item a unique id
		items.forEach((item) => {
			item.children.forEach((child: any) => {
				child.id = child.totem_id;
			});
		});
		console.log(items);
		setItems(items);
	};

	const handleItemChange = (dragItem: any, destinationParent: any) => {
		console.log(dragItem, destinationParent);
		if (dragItem.group && destinationParent) {
			toast.error(
				"Impossible de déplacer un groupe dans un autre groupe"
			);
			return false;
		} else if (!dragItem.group && !destinationParent) {
			return false;
		} else {
			// use methode put on localhost:5050/admin/group/:groupe_id/:new_groupe_id/:totem_ip?token=token
			// if totem_ip is not specified, it will move the whole group
			// if totem_ip is specified, it will move only the totem
			var query =
				"http://" +
				process.env.REACT_APP_CENTRAL_ADRESS +
				":5050/admin/group/" +
				dragItem.totem_id +
				"/" +
				destinationParent?.totem_id +
				"/" +
				(dragItem.group ? "" : dragItem.totem_ip) +
				"?token=" +
				userInfo.token;
			console.log(query);
			toast.promise(moveToGoup(query), {
				loading: "Déplacement en cours...",
				success: "Déplacement réussi",
				error: "Erreur lors du déplacement",
			});
			getTotems();
			return true;
		}
	};

	const moveToGoup = (query: string) => {
		return new Promise((resolve, reject) => {
			fetch(query, {
				method: "PUT",
			})
				.then((response) => {
					console.log(response);
					if (!response.ok) reject(true);
					return response.json();
				})
				.then((data) => {
					console.log(data);
					if (data === "success") resolve(true);
					else reject(true);
				});
		});
	};

	return (
		<div className="nestableContainer">
			<Nestable
				items={items}
				renderItem={({ item, collapseIcon }) => (
					<TotemItem item={item} icon={collapseIcon} />
				)}
				renderCollapseIcon={({ isCollapsed }) => (
					<ExpandIcon isCollapsed={isCollapsed} />
				)}
				collapsed={false}
				maxDepth={2}
				confirmChange={({ dragItem, destinationParent }) =>
					handleItemChange(dragItem, destinationParent)
				}
			/>
		</div>
	);
}

const TotemItem = (props: any) => {
	return (
		<>
			{props.item.group ? (
				<div className="totem-group">
					<div className="totem-group-name">
						<span className="collapseIcon">{props.icon}</span>
						<h1 className="fs-headline-4 monument c-onBackground">
							GROUPE <span>#{props.item.totem_id}</span>
						</h1>
					</div>
				</div>
			) : (
				<div className={`totem-item`}>
					<div className="totem-item-name">
						<span className="status-indicator"></span>
						<h1 className="fs-headline-4 monument c-primary">
							TOTEM{" "}
							<span className="c-onBackground">
								#{props.item.totem_id}
							</span>
						</h1>
					</div>
					<div className="totem-item-id">
						<p className="fs-subtitle-4 bold c-grey">
							{props.item.totem_ip}
						</p>
					</div>
					<div className="totem-item-settings">
						<BsSliders2Vertical />
					</div>
				</div>
			)}
		</>
	);
};

const ExpandIcon = (props: any) => {
	return (
		<BsChevronRight
			className={`collapseIcon ${props.isCollapsed ? "collapsed" : ""}`}
		/>
	);
};
