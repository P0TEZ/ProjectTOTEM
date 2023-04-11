import React, { useEffect } from "react";
import "./TotemList.scss";

import Nestable from "react-nestable";
import { toast } from "react-hot-toast";

import { UserContext } from "../../context/User";

import { BsChevronRight, BsSliders2Vertical } from "react-icons/bs";

interface Props {
	setGroup: (group: number) => void;
}

export default function TotemList(props: Props) {
	const [items, setItems] = React.useState<any[]>([]);
	const { userInfo } = React.useContext(UserContext);

	useEffect(() => {
		toast.promise(getTotems(), {
			loading: "Chargement des totems...",
			success: "Liste des totems chargée",
			error: "Erreur lors du chargement des totems",
		});
	}, []);

	useEffect(() => {
		console.log(items);
	}, [items]);

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
			totem_id: "newGroup",
			id: "newGroup",
			group: true,
			children: [],
		});
		console.log(items);
		setItems(items);
	};

	const handleItemChange = (dragItem: any, destinationParent: any) => {
		console.log("dragItem", dragItem);
		if (!destinationParent) return false;
		if (dragItem.id === "newTotem") return false;
		if (dragItem.totem_id === "newTotem") return false;
		if (destinationParent.totem_id === "newGroup") return false;
		if (destinationParent.id.toString() === dragItem.groupe_id.toString()) return false;
		if (dragItem.group) return false;
		if (dragItem.totem_id === destinationParent.totem_id) return false;
		if (dragItem.totem_ip === destinationParent.totem_ip) return false;
		if (dragItem.totem_id === destinationParent.id) return false;
		if (dragItem.totem_ip === destinationParent.ip) return false;

		console.log(
			"moving totem " +
				dragItem.totem_id +
				" to group " +
				destinationParent.totem_id +
				" with ip " +
				dragItem.totem_ip
		);

		var query =
			"http://" +
			process.env.REACT_APP_CENTRAL_ADRESS +
			":5050/admin/group/" +
			destinationParent.totem_id +
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

	const newGroup = () => {
		// add an empty group to the local items
		// find a group number that is not already existing
		var newGroupId = 1;
		while (items.find((item) => item.totem_id.toString() === newGroupId.toString())) {
			newGroupId++;
		}
		const newItems = items;
		newItems.push({
			totem_id: "" + newGroupId,
			id: "newGroup",
			group: true,
			children: [
				{
					totem_id: "newTotem",
					id: "newTotem",
					group: false,
					children: [],
				},
			],
		});
		console.log(newItems);
		setItems(newItems);
	};

	return (
		<div className="nestableContainer">
			<Nestable
				items={items}
				renderItem={({ item, collapseIcon }) => (
					<TotemItem
						item={item}
						icon={collapseIcon}
						setGroup={props.setGroup}
						newGroup={newGroup}
					/>
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
	const handleClick = () => {
		if (props.item.group) {
			if (props.item.id !== "newGroup") {
				props.setGroup(props.item.totem_id);
			} else {
				console.log("Nouvoooooo grouuupe");
				props.newGroup();
			}
		} else {
			props.setGroup(props.item.groupe_id);
		}
	};

	return (
		<>
			{props.item.group ? (
				<div
					className={`totem-group ${
						props.item.totem_id === "newGroup" ? "newGroup" : ""
					}`}
					onClick={handleClick}
				>
					<div className="totem-group-name">
						{props.item.totem_id === "newGroup" ? (
							""
						) : (
							<span className="collapseIcon">{props.icon}</span>
						)}
						<h1 className="fs-headline-4 monument c-onBackground center">
							{props.item.totem_id === "newGroup"
								? "Nouveau groupe"
								: "GROUPE # " + props.item.totem_id}
						</h1>
					</div>
				</div>
			) : (
				<div className={`totem-item`} onClick={handleClick}>
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
