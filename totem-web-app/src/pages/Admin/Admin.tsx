import React from 'react'

import TotemList from '../../components/TotemList/TotemList'
import Button from '../../components/Button/Button'
// import "leave" icon from react-icons
import { IoMdExit } from 'react-icons/io'


export default function Admin() {
    const [connected, setConnected] = React.useState<boolean>(false);

    return (
        <div className='PAGE_CONTAINER' id="AdminPage">
            {
            connected ?
                <>
                    <TotemList/> 
                </>
            : 
                <>
                    <h1 className='fs-headline-2 monument c-primary'>Page admin</h1>
                    <h3 className='fs-subtitle-4 c-grey'>Cette page est réservée à l'organisateur et admnistrateur de l'évenement. Si ce n'est pas votre cas, veuillez <span className='c-primary bold'>cliquer sur le bouton ci-dessous.</span></h3>
                    <Button to="/welcome" icon={<IoMdExit/>}>Quitter</Button>
                    <input type="password" placeholder="Mot de passe" />
                </>
            }

            
        </div>
    )
}
