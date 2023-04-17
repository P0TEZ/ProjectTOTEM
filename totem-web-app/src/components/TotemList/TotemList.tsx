import React, { useEffect } from "react";
import "./TotemList.scss";

import Nestable from "react-nestable";
import { toast } from "react-hot-toast";

import { UserContext } from "../../context/User";

import { BsChevronRight } from "react-icons/bs";
import Button from "../Button/Button";
import { TotemItem } from "./TotemItem";

interface Props {
	setGroup: (group: number) => void;
	selectedGroup: number;
	setTotemCount: (totemCount: number) => void;
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

	const convertToItems = (data: []) => {
		props.setTotemCount(data.length);
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
		const firstGroupId = items[0].totem_id;
		props.setGroup(parseInt(firstGroupId));
		setItems(items);
	};

	const handleItemChange = (dragItem: any, destinationParent: any) => {
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
		setItems(newItems);
		const firstGroupId = items[0].totem_id;
		props.setGroup(firstGroupId); // DO NOT REMOVE THIS LINE
		props.setGroup(firstGroupId); // I DON'T KNOW WHY BUT IT WORKS ONLY IF IT IS CALLED TWICE
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
						selectedGroup={props.selectedGroup}
					/>
				)}
				renderCollapseIcon={({ isCollapsed }) => <ExpandIcon isCollapsed={isCollapsed} />}
				collapsed={false}
				maxDepth={2}
				confirmChange={({ dragItem, destinationParent }) =>
					handleItemChange(dragItem, destinationParent)
				}
			/>
			<Button onClick={newGroup} className="m">
				Nouveau groupe
			</Button>
		</div>
	);
}
interface IconProps {
	isCollapsed: boolean;
}

const ExpandIcon = (props: IconProps) => {
	return <BsChevronRight className={`collapseIcon ${props.isCollapsed ? "collapsed" : ""}`} />;
};
