import React, { useEffect } from 'react'
import characterImg from "./../../assets/images/character.png"
//import arrow right icon from react-icons fontawesome
import { FaArrowRight } from 'react-icons/fa'


import './Onboarding.scss'

import Button from "./../../components/Button/Button"

export default function Onboarding() {
  useEffect(() => {
    document.title = "TOTEM - Bienvenue"
  }, [])
  
  return (
    <>
        <div id="OnboardingPage" className='PAGE_CONTAINER'>

          <div className='characterContainer' data-aos="zoom-in" data-aos-delay={200}>
            <img src={characterImg} alt="A woman walking forward to the right" aria-label='A woman walking forward to the right' className='character'/>
          </div>

          <div className='textContainer'>
            <h1 className='catchPhrase fs-headline-4 bold' data-aos="zoom-out" data-aos-delay={400}>
              <strong>Totem</strong><br/>La magie de la musique, pour tous.
            </h1>
            <p className='fs-body-1 c-lightGrey' data-aos="zoom-out" data-aos-delay={600}>
              Cliquez sur le bouton ci-dessous pour commencer
            </p>
          </div>
          <Button 
            aos={{anim:"fade-up", offset:-200, delay:800}} 
            icon={<FaArrowRight/>} 
            to="/code"
          >
            Commencer
            </Button>
        </div>

    </>
  )
}
