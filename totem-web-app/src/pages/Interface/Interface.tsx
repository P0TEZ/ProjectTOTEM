import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './Interface.scss'
import './KnobOverlay.scss'

import Status from '../../components/Status/Status'
import Button from '../../components/Button/Button'
import KnobPage from '../Knob/Knob'

import {RiVolumeVibrateLine, RiVolumeDownLine} from 'react-icons/ri'
import {IoHandRight} from 'react-icons/io5'
import { toast } from 'react-hot-toast'
import { CSSTransition } from 'react-transition-group'

function Interface() {
    const {code} = useParams<{code: string}>();
    const [status, setStatus] = useState("Connexion")
    const [helpAsked, setHelpAsked] = useState(false)
    const nodeRef = React.useRef(null)
    const [inProp, setInProp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "TOTEM"
        setStatus("Connecté")
    }, []);

    // Assistance
    const handleHelp = () => {
        setHelpAsked(!helpAsked)
        console.log(helpAsked)
    }
    useEffect(()=>{
        if(helpAsked){
            toast.promise(
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        setHelpAsked(false)
                        resolve("ok")
                    }
                    , 5000)
                }),
                {
                    loading: "Demande d'assistance en cours...",
                    success: <b>Assistance terminée !</b>,
                    error: <b>Assistance échouée !</b>,
                }
            )
           
        }
    }, [helpAsked])


    // Knobs
    const openKnob = (knob:string)=>{
        console.log("open knob", knob)
        // add /L to the url with react router
        window.history.pushState({}, '', '/'+code+'/L');

        setInProp(!inProp)
    }

    useEffect(()=>{
        console.log("inProp", inProp)
    }, [inProp])



    return (
        <>
            <CSSTransition nodeRef={nodeRef} in={inProp} classNames="knob-popup" unmountOnExit timeout={200}>
                <div id="KnobContainer" ref={nodeRef}>
                        <KnobPage />
                        <button style={{position:"absolute", top:'50%', zIndex:1000}} onClick={() => setInProp(!inProp)}>Click to Enter</button>
                </div>
            </CSSTransition>
            <div id="InterfacePage" className='PAGE_CONTAINER'>

                <Status code={code} status={status}/>

                <div className="btnContainer">
                    <Button 
                        onClick={() => openKnob("L")} 
                        icon={<RiVolumeVibrateLine className='fs-headline-4'  style={{transform:'scaleX(-1)'}}/>}
                        label="Gauche"
                        onlyIcon={true}
                        outlined={true}
                        />
                    <Button 
                        onClick={() => openKnob("V")} 
                        icon={<RiVolumeDownLine className='fs-headline-4'/>}
                        label="Volume"
                        onlyIcon={true}
                        />
                    <Button 
                        onClick={() => openKnob("R")} 
                        icon={<RiVolumeVibrateLine className='fs-headline-4'/>}
                        label="Droite"
                        onlyIcon={true}
                        outlined={true}
                        />
                </div>
                    <div className="helpBtn" onClick={()=>handleHelp()}>
                        <IoHandRight className={`c-primary fs-headline-2 ${helpAsked && "helpAsked"}`}/>
                        <p className='fs-body-1 c-primary'>Assistance</p>
                    </div>
                
            </div>
        </>
    )
}

export default Interface