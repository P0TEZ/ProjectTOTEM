import React from 'react'
// @ts-ignore
import {Knob} from 'react-rotary-knob';
// @ts-ignore
import * as skins from 'react-rotary-knob-skin-pack';

import './Knob.scss';


export default function KnobPage() {
    const [knobValue, setKnobValue] = React.useState(0);

    const handleChange = (value: number) => {
        if(value>100)return
        else{
            setKnobValue(value);
        }
    }

    React.useEffect(() => {
        console.log(knobValue);
    }, [knobValue]);

    return (
        <div className='PAGE_CONTAINER' id="knobPage">

            <div className='knobLabel'>
                <h1 className='fs-headline-3 c-onBackground bold '>Intensité droite : </h1>
                <p className='fs-body-1 c-grey'>Force avec laquelle vous ressentez la musique sur le vibreur droit</p>
            </div>

            <div className='knobContainer'>
                <div className='knobValueContainer'>
                    <h1 className='fs-headline-2 c-primary bold monument knobValue'>{Math.round(knobValue)}</h1>
                    <p className='fs-body-2 c-onBackground knobValueLabel bold'>Intensité droite</p>
                </div>
                <Knob
                    value={knobValue}
                    min={0}
                    max={200}
                    defaultValue={50}
                    unlockDistance={0}
                    step={1}
                    preciseMode={false}
                    onChange={handleChange}
                    className="knob"
                    rotateDegrees={180}
                    skin={skins.s14}  
                    style={{
                        width:'100vw',
                        height:'auto',
                        maxWidth:'400px',
                    }}
                />
            </div>
        </div>
    )
}
