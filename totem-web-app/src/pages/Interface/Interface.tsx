import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './Interface.scss'

import Status from '../../components/Status/Status'
import Button from '../../components/Button/Button'

import {RiVolumeVibrateLine, RiVolumeDownLine} from 'react-icons/ri'
import {IoHandRight} from 'react-icons/io5'

function Interface() {
    const {code} = useParams<{code: string}>();
    const [status, setStatus] = useState("Connexion")
    const [helpAsked, setHelpAsked] = useState(false)

    const handleHelp = () => {
        setHelpAsked(!helpAsked)
    }

    useEffect(() => {
        document.title = "TOTEM"
        setStatus("Connecté")
    }, []);


    return (
        <div id="InterfacePage" className='PAGE_CONTAINER'>

            <Status code={code} status={status}/>

            <div className="btnContainer">
                <Button 
                    onClick={() => console.log("Button 1")} 
                    icon={<RiVolumeVibrateLine className='fs-headline-4'  style={{transform:'scaleX(-1)'}}/>}
                    label="Gauche"
                    onlyIcon={true}
                />
                <Button 
                    onClick={() => console.log("Button 2")} 
                    icon={<RiVolumeDownLine className='fs-headline-4'/>}
                    label="Volume"
                    onlyIcon={true}
                />
                <Button 
                    onClick={() => console.log("Button 3")} 
                    icon={<RiVolumeVibrateLine className='fs-headline-4'/>}
                    label="Droite"
                    onlyIcon={true}
                />
                <div className="helpBtn" onClick={()=>handleHelp()}>
                    <IoHandRight className={`c-primary fs-headline-2 ${helpAsked ? "helpAsked":""}`}/>
                    <p className='fs-body-1 c-primary'>Assistance</p>
                </div>
            </div>
            
        </div>
    )
}

export default Interface