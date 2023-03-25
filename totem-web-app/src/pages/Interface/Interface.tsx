import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './Interface.scss'

function Interface() {
    const {code} = useParams<{code: string}>();
    const [status, setStatus] = useState("Connexion")

    useEffect(() => {
        document.title = "TOTEM"
        setStatus("Connecté")
    }, []);

    let statusClass = '';
    switch (status) {
        case 'Connecté':
            statusClass = 'status connected';
            break;
        case 'Déconnecté':
            statusClass = 'status disconnected';
            break;
        default:
            statusClass = 'status connecting';
    }


    return (
        <div id="InterfacePage" className='PAGE_CONTAINER'>

            <div className='statusContainer'>
                <h1 className='fs-headline-4'>
                    N° <strong className='monument'>{code}</strong>
                </h1>
                <p className='fs-body-1'>
                    <strong className={statusClass}>{status}</strong>
                </p>
            </div>
            
        </div>
    )
}

export default Interface