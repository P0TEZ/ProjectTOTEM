import React, { useEffect } from 'react'
import { useState } from 'react'

import './Status.scss'

export default function Status(props : any) {
    const [statusClass, setStatusClass] = useState("status connecting");

    useEffect(() => {
        switch(props.status){
            case "Connecté":
                setStatusClass("status connected");
                break;
            case "Déconnecté":
                setStatusClass("status disconnected");
                break;
            default:
                setStatusClass("status connecting");
                break;
        }
    }, [props.status])  

    return (
        <div className='statusContainer'>
            <h1 className='fs-headline-4'>
                N° <strong className='monument'>{props.code}</strong>
            </h1>
            <p className='fs-body-1'>
                <strong className={statusClass}>{props.status}</strong>
            </p>
        </div>
    )
}
