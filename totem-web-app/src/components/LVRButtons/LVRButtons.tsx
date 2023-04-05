import React from 'react'
import './LVRButtons.scss'
import Button from '../../components/Button/Button'
import {RiVolumeVibrateLine, RiVolumeDownLine} from 'react-icons/ri'

export default function LVRButtons(props: any) {
  return (
    <div className="btnContainer">

        <Button 
                        onClick={() => props.openKnob("L")} 
                        icon={<RiVolumeVibrateLine className='fs-headline-4'  style={{transform:'scaleX(-1)'}}/>}
                        label="Gauche"
                        onlyIcon={true}
                        outlined={true}
                        aos={{anim:"zoom-in", delay:400}}
                        />
                    <Button 
                        onClick={() => props.openKnob("V")} 
                        icon={<RiVolumeDownLine className='fs-headline-4'/>}
                        label="Volume"
                        onlyIcon={true}
                        aos={{anim:"zoom-in", delay:500}}
                        />
                    <Button 
                        onClick={() => props.openKnob("R")} 
                        icon={<RiVolumeVibrateLine className='fs-headline-4'/>}
                        label="Droite"
                        onlyIcon={true}
                        outlined={true}
                        aos={{anim:"zoom-in", delay:600}}
                        />
    </div>
  )
}
