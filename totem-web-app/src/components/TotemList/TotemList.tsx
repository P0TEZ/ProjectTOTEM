import React, { useEffect } from 'react'
import './TotemList.scss'

import Nestable from 'react-nestable';
// import userinfo context
import { UserContext } from '../../context/User';
import { toast } from 'react-hot-toast';	

export default function TotemList() {
	// get list of totems from the server
	const [items, setItems] = React.useState<any[]>([])
	const { userInfo } = React.useContext(UserContext);

	useEffect(() => {
		toast.promise(getTotems(),
		{
			loading: 'Chargement des totems...',
			success: 'Liste des totems chargée',
			error: 'Erreur lors du chargement des totems'
		})
	},[])

	const getTotems = () => {
		return new Promise((resolve, reject) => {
			fetch('http://'+process.env.REACT_APP_CENTRAL_ADRESS+':5050/admin/?token='+userInfo.token)
			.then(response => {
				console.log(response)
				if(!response.ok)reject(true)
				return response.json()
			})
			.then(data => {
				console.log(data)
				convertToItems(data)
				resolve(true)
			})
		})
	}

	const convertToItems = (data : any) => {
		console.log(data)
		const newItems = data.map((item:any) => {
			return {
				id: item.totem_id,
				ip: item.totem_ip,
			}
		})
		setItems(newItems)
	}

    return (
        <Nestable items={items} renderItem={({item})=><TotemItem item={item}/>}/>
    )
}

const TotemItem = (props: any) => {
	useEffect(() => {
		console.log(props)
	},[])
	return (
		<div className="totem-item">
			<h1 className="totem-item-name fs-headline-4 monument c-primary">
				TOTEM <span className='c-onBackground'>#{props.item.id}</span>
			</h1>
			<p className="totem-item-id fs-subtitle-4 bold c-grey">
				{props.item.ip}
			</p>
		</div>
	)
}
