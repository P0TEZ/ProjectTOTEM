import React from 'react'
import characterImg from "./../../assets/images/character.png"

import './Onboarding.scss'

export default function Onboarding() {
  return (
    <>
        <div id="OnboardingPage" className='PAGE_CONTAINER'>

          <div className='characterContainer'>
            <img src={characterImg} alt="A woman walking forward to the right" aria-label='A woman walking forward to the right' className='character'/>
          </div>
          <div className='textContainer'>
            <h1 className='catchPhrase fs-headline-4 bold'>
              <strong>Totem</strong><br/>La magie de la musique, pour tous.
            </h1>
            <p className='fs-body-1 c-grey'>
            Cliquez sur le bouton ci-dessous pour commencer
            </p>
          </div>
          <button>test</button>
        </div>

    </>
  )
}
