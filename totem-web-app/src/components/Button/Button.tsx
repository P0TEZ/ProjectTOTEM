import React from 'react';
import './Button.scss';
import { useNavigate } from 'react-router-dom';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  icon:JSX.Element;
  to?: string;
  aos?: {anim: string, offset?: number, delay?: number};
}

const Button: React.FC<ButtonProps> = ({ onClick, aos, icon, to, children }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if(to){
            navigate(to);
        }
        else if(onClick){
            onClick();
        }
    }
    return (
        <button 
            className="btn fs-body-1" 
            onClick={handleClick} 
            data-aos={aos?aos.anim:""}
            data-aos-offset={aos?aos.offset:0}
            data-aos-delay={aos?aos.delay:0}
        >
            <span className='btn__text bold'>{children}</span>
            <span className='btn__icon'> 
                {icon}
            </span>
        </button>
    );
};

export default Button;