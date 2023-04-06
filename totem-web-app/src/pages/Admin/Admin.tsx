import React from 'react'

import AdminLogin from '../../components/AdminLogin/AdminLogin';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';

export default function Admin() {
    const [connected, setConnected] = React.useState<boolean>(false);

    return (
        <div className='PAGE_CONTAINER' id="AdminPage">
            {
            connected ?
                <>
                    <AdminDashboard/>
                </>
            : 
                <AdminLogin setConnected={setConnected}/>
            }

            
        </div>
    )
}
