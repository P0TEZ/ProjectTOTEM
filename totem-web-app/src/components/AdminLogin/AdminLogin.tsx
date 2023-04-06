import React from 'react'
import './AdminLogin.scss'

import Button from '../../components/Button/Button'

import { toast } from 'react-hot-toast'

export default function AdminLogin(props:any) {
    const [password, setPassword] = React.useState<string>('T0TEM@dmin')
    const adress = process.env.REACT_APP_CENTRAL_ADRESS + ":5000"

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }


    const handleConnect = () => {
        toast.promise(connectAdmin(password, adress),
            {
                loading: 'Connexion en cours...',
                success: 'Connecté en tant qu\'administrateur',
                error: 'Erreur lors de la connexion'
            }
        )
    }
    const connectAdmin = (password: string, adress:string) => {
        return new Promise((resolve, reject) => {
            fetch("http://"+ adress + "/admin/"+ password, {
                method: 'GET',
            })
            .then(res => {
                if(!res.ok){
                    reject(new Error("Mot de passe administrateur incorrect"))
                }
                return res.json()
            })
            .then(res => {
                if(res.length === 0){
                    reject(new Error("Mot de passe administrateur incorrect"))
                }
                else{
                    props.setConnected(true)
                    resolve(true)
                }
                
            })
            .catch(err => {
                reject(new Error("Erreur lors de la connexion"))
            })
        })
    }


    return (
    <>
        <div id="adminWelcome">
            <div className='texts'>
                <h1 className='fs-headline-2 monument c-red'>Page admin</h1>
                <h3 className='fs-subtitle-4 c-grey'>Cette page est réservée à l'organisateur et admnistrateur de l'évenement. Si ce n'est pas votre cas, veuillez <a href="/welcome" className='c-red bold'>cliquer ici.</a></h3>
            </div>
        </div>
        <div id="adminLoginCont">
            <div id="adminLogin" className='s-far'>
                <input type="password" placeholder="Mot de passe" value={password} onChange={handleChange} className='input-password fs-body-1'/>
                <Button onClick={handleConnect}>Se connecter</Button>
            </div>
        </div>
            
    </> 
    )
}
