import React from 'react'
import Nestable from 'react-nestable';


export default function TotemList() {

	// get list of totems from the server
	const [totems, setTotems] = React.useState<any[]>([])
	React.useEffect(() => {
		fetch('http://'+process.env.REACT_APP_CENTRAL_ADRESS+':5050/admin/?token='+localStorage.getItem('token'))
		.then(response => response.json())
		.then(data => {
			setTotems(data)
		})
	},[])

    return (
        <Nestable />
    )
}
