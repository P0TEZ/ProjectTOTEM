import React from 'react'
// @ts-ignore
import {Knob} from 'react-rotary-knob';
// @ts-ignore
import * as skins from 'react-rotary-knob-skin-pack';
import useFetchOnChange from '../../hooks/useFetchOnChange';

import { UserContext} from '../../context/User';

import './Knob.scss';
import useFetchState from '../../hooks/useFetchState';


export default function KnobPage(props : any) {
    const {userInfo} = React.useContext(UserContext)
    let token = userInfo.token;

    var adressToFetchForDefaultValue = "http://"+process.env.REACT_APP_CENTRAL_ADRESS+":5050"
    adressToFetchForDefaultValue+="/user/param/"+props.texts[props.pos].param_name+"/?token="+token;
    // const [knobValue, setKnobValue] = React.useState(0);
    const [knobValue, setKnobValue] = useFetchState(
        adressToFetchForDefaultValue,
        0,
    );

    const handleChange = (value: number) => {
        if(value>100)return
        else{
            value = Math.round(value);
            setKnobValue(value);
        }
    }

    var adress = "http://"+process.env.REACT_APP_CENTRAL_ADRESS+":5050"
    adress+="/user/param/"+props.texts[props.pos].param_name+"/"

    const [data, loading, error, refetch] = useFetchOnChange(
        adress,
        knobValue,
        token
    );

    console.log(data, loading, error, refetch)

    return (
        <div className='' id="knobPage">

            <div className='knobLabel'>
                <h1 className='fs-headline-3 c-onBackground bold '>{props.texts[props.pos].title}</h1>
                <p className='fs-body-1 c-grey'>{props.texts[props.pos].desc}</p>
            </div>

            <div className='knobContainer'>
                <div className='knobValueContainer'>
                    <h1 className='fs-headline-2 c-primary bold monument knobValue'>{Math.round(knobValue)}</h1>
                    <p className='fs-body-2 c-onBackground knobValueLabel bold'>{props.texts[props.pos].title}</p>
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
                    skin={skins.s6}  
                    style={{
                        width:'100vw',
                        height:'100%',
                        aspectRatio:"1/1",
                    }}
                />
            </div>
        </div>
    )
}
