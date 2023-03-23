import React from 'react'
import './Header.scss'
import { FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  }
  return (
    <div className='header fs-headline-5 monument c-onBackground'>
      {
      window.location.pathname !== '/welcome' ? 
        <FaChevronLeft 
          onClick={handleClick} 
          className='header__icon'
          data-aos="fade-right"
        /> 
        : null  
      }
      <p data-aos="fade-down">TOTEM</p>
    </div>
  )
}
