import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './Interface.scss'
import './KnobOverlay.scss'

import Status from '../../components/Status/Status'
import KnobPage from '../Knob/Knob'
import LVRButtons from '../../components/LVRButtons/LVRButtons'
import Dropdown from '../../components/Dropdown/Dropdown'   

import { UserContext } from '../../context/User'

import {IoHandRight} from 'react-icons/io5'
import { toast } from 'react-hot-toast'
import { CSSTransition } from 'react-transition-group'

const texts = {
    "L": {
        title: "Intensité gauche",
        desc: "Force avec laquelle vous ressentez la musique sur le vibreur gauche"
    },
    "R": {
        title: "Intensité droite",
        desc: "Force avec laquelle vous ressentez la musique sur le vibreur droit"
    },
    "V":{
        title: "Volume",
        desc: "Volume global"
    },
}

function Interface(props: any) {
    const nodeRef = React.useRef(null)
    const navigate = useNavigate()
    const [status, setStatus] = useState("Connexion")
    const [helpAsked, setHelpAsked] = useState(false)
    const [inProp, setInProp] = useState(false);
    const [animClass, setAnimClass] = useState("knob-popup-L")
    const [knob, setKnob] = useState("L")
    const { userInfo } = React.useContext(UserContext)

    useEffect(() => {
        document.title = "TOTEM"
        console.log(userInfo)
        if(userInfo.TotemId === '' || userInfo.token === ''){
            console.log("Nope !")
            navigate("/code")
        }
        setStatus("Connecté")
    }, [userInfo, navigate]);

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
        setKnob(knob)
        setInProp(true)
        setAnimClass("knob-popup-"+knob)
        console.log(animClass)
    }
    
    

    return (
        <>
            <CSSTransition nodeRef={nodeRef} in={inProp} classNames={animClass} unmountOnExit timeout={200}>
                <div id="KnobContainer" ref={nodeRef}>
                        <button style={{position:"absolute", bottom:'0', zIndex:1000}} onClick={() => setInProp(false)}>Leave</button>
                        <KnobPage pos={knob} texts={texts}/>
                </div>
            </CSSTransition>
            <div id="InterfacePage" className='PAGE_CONTAINER'>

                <Status code={userInfo.TotemId} status={status}/>

                <LVRButtons openKnob={openKnob}/>

                <Dropdown />
                
                <div className="helpBtn" onClick={()=>handleHelp()} data-aos="fade-up" data-aos-delay="800">
                    <IoHandRight className={`c-primary fs-headline-2 ${helpAsked && "helpAsked"}`}/>
                    <p className='fs-body-1 c-primary'>Assistance</p>
                </div>
                
            </div>
        </>
    )
}

export default Interface