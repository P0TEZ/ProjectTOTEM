import React, { useEffect } from "react";
import "./TotemList.scss";

import Nestable from "react-nestable";
import { toast } from "react-hot-toast";

import { UserContext } from "../../context/User";

import { BsChevronRight, BsSliders2Vertical } from "react-icons/bs";

export default function TotemList() {
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
		const newItems = data.reduce((acc: any, obj: any) => {
			const key = obj.groupe_id;
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
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
		// add placeholder for an empty group for the user to create a new group
		// create a group number that is not already existing
		var newGroupId = 1;
		while (items.find((item) => item.id.toString() === newGroupId.toString())) {
			newGroupId++;
		}
		items.push({
			totem_id: "" + newGroupId,
			id: "newGroup",
			group: true,
			children: [],
		});
		console.log(items);
		setItems(items);
	};

	const handleItemChange = (dragItem: any, destinationParent: any) => {
		if (!destinationParent) return false;
		if (destinationParent.id === "newGroup") return false;
		if (dragItem.group) return false;
		if (dragItem.totem_id === destinationParent.totem_id) return false;
		if (dragItem.totem_ip === destinationParent.totem_ip) return false;
		if (dragItem.totem_id === destinationParent.id) return false;
		if (dragItem.totem_ip === destinationParent.ip) return false;

		var destination = "";
		if (destinationParent) {
			destination = destinationParent.id;
		} else {
			destination = "" + items.length;
		}

		console.log(
			"moving totem " +
				dragItem.totem_id +
				" to group " +
				destination +
				" with ip " +
				dragItem.totem_ip
		);

		var query =
			"http://" +
			process.env.REACT_APP_CENTRAL_ADRESS +
			":5050/admin/group/" +
			destination +
			"/" +
			dragItem.totem_id +
			"/" +
			dragItem.totem_ip +
			"?token=" +
			userInfo.token;

		toast.promise(moveToGoup(query), {
			loading: "Déplacement en cours...",
			success: "Déplacement réussi",
			error: "Erreur lors du déplacement",
		});

		return true;
	};

	const moveToGoup = (query: string) => {
		return new Promise((resolve, reject) => {
			fetch(query, {
				method: "PUT",
			})
				.then((response) => {
					if (!response.ok) reject(true);
					return response.json();
				})
				.then((data) => {
					if (data === "success") {
						getTotems().then(() => resolve(true));
					} else reject(true);
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
				renderCollapseIcon={({ isCollapsed }) => <ExpandIcon isCollapsed={isCollapsed} />}
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
				<div className={`totem-group ${props.item.id === "newGroup" ? "newGroup" : ""}`}>
					<div className="totem-group-name">
						<span className="collapseIcon">{props.icon}</span>
						<h1 className="fs-headline-4 monument c-onBackground">
							{props.item.id === "newGroup"
								? "Nouveau groupe"
								: "GROUPE # " + props.item.totem_id}
						</h1>
					</div>
				</div>
			) : (
				<div className={`totem-item`}>
					<div className="totem-item-name">
						<span className="status-indicator"></span>
						<h1 className="fs-headline-4 monument c-primary">
							TOTEM <span className="c-onBackground">#{props.item.totem_id}</span>
						</h1>
					</div>
					<div className="totem-item-id">
						<p className="fs-subtitle-4 bold c-grey">{props.item.totem_ip}</p>
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
	return <BsChevronRight className={`collapseIcon ${props.isCollapsed ? "collapsed" : ""}`} />;
};
