import React, { useEffect } from 'react'
import './Code.scss'
import ReactCodeInput from 'react-code-input'

import { inputStyle } from './../../utils/CodeInputStyle'

export default function Code() {
    useEffect(() => {
        document.title = "TOTEM - Code"
    }, [])

    return (
        <div id="CodePage" className='PAGE_CONTAINER'>

            <div className='textContainer'>
                <h1 className='catchPhrase fs-headline-4 bold' data-aos="fade-right" >
                    Connectez vous à votre <strong>expérience</strong> !
                </h1>
                <p className='fs-body-1 c-lightGrey' data-aos="fade-right" data-aos-delay={200}>
                    Entrez le code de votre totem ou scannez son QR code situé sur le TOTEM
                </p>
            </div>

            <div className='codeContainer' data-aos="fade-up" data-aos-delay={400}>
                <ReactCodeInput
                    placeholder='_'
                    type='number'
                    fields={4}
                    name="code"
                    inputMode='numeric'
                    className='fs-headline-4'
                    inputStyle={inputStyle.inputStyle}
                    inputStyleInvalid={inputStyle.inputStyleInvalid}
                />
                <a href="/help">
                    <p className='fs-body-1 c-primary'>Où trouver mon code ?</p>
                </a>
            </div>
        </div>
    )
}
