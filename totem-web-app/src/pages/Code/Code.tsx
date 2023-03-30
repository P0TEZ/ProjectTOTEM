import React, { useEffect } from 'react'
import './Code.scss'
import ReactCodeInput from 'react-code-input'
import { toast } from 'react-hot-toast'

import { inputStyle } from './../../utils/CodeInputStyle'
import { useNavigate } from 'react-router-dom'

export default function Code() {
    const navigate = useNavigate()    
    useEffect(() => {
        document.title = "TOTEM - Code"
        const inputs = document.querySelectorAll("input")
        inputs.forEach((input) => {
            input.placeholder = "_"
        })
    })

    const connectWithCode = (code: string) => {
        // send the code to the server with a get request
        return new Promise((resolve, reject) => {
            var headers = {}
            fetch("http://127.0.0.1:5000/totem/"+code,{
                method : "GET",
                mode: 'cors',
                headers: headers
            })
            .then((response) => {
                console.log(response)
                if(response.status === 200){
                    resolve(response)
                }
                else{
                    reject(new Error("Le code est incorrect"))
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    // TODO : Make the inputs by the user smoother (remove the code when an error occurs)
    const handleChange = (codeInput: string) => {
        // If the user has finished typing his code
        if(codeInput.length === 4){
            // Remove the keyboard when the user has finished typing
            try{ (document.activeElement as HTMLElement).blur() }
            catch(e){console.log(e)}

            // Send the code to the server and make a toast to notify the user
            toast.promise(
                connectWithCode(codeInput),
                {
                    loading: "Tentative de connexion...",
                    success: <b>Connexion réussie !</b>,
                    error: <b>Connexion échouée !</b>,
                }
            ).then(() => {
                // If the connection is successful, redirect the user to his settings page
                navigate("/"+codeInput)
            })
            .catch((error)=>{
                toast.error(error.message);
            })
        }
    }

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
                    placeholder='#'
                    type='number'
                    fields={4}
                    name="code"
                    inputMode='numeric'
                    className='fs-headline-4'
                    inputStyle={inputStyle.inputStyle}
                    inputStyleInvalid={inputStyle.inputStyleInvalid}
                    autoFocus={false}
                    onChange={(code) => handleChange(code)}
                />
                <a href="/help">
                    <p className='fs-body-1 c-primary'>Où trouver mon code ?</p>
                </a>
            </div>

        </div>
    )
}
