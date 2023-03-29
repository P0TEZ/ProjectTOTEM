import React, { useEffect } from 'react'
import characterImg from "./../../assets/images/character.png"
import { FaArrowRight } from 'react-icons/fa'


import './Onboarding.scss'

import Button from "./../../components/Button/Button"
import Blob from "./../../components/Blob/Blob"

export default function Onboarding() {
  useEffect(() => {
    document.title = "TOTEM - Bienvenue"
  }, [])
  
  return (
    <>
        <div id="OnboardingPage" className='PAGE_CONTAINER'>
          {/*<Blob color={{color1: "var(--primary-color)", color2:"hsl(239, 85%, 80%)"}} speed={3} opacity={.3}/>*/}
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
