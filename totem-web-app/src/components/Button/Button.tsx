import React from 'react';
import './Button.scss';
import { useNavigate } from 'react-router-dom';

type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  icon?:JSX.Element;
  to?: string;
  aos?: {anim: string, offset?: number, delay?: number};
  label?: string;
  onlyIcon?: boolean;
  outlined?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ onClick, aos, icon, to, label,style, outlined, onlyIcon, children }) => {
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
            className={`btn fs-body-1 s-far ${onlyIcon ? "onlyIcon":""} ${outlined ? "outlined":""}`}
            onClick={handleClick} 
            data-aos={aos?aos.anim:""}
            data-aos-offset={aos?aos.offset:0}
            data-aos-delay={aos?aos.delay:0}
            style={style}
        >
            {children && <span className='btn__text bold'>{children}</span>}
            {icon && <span className='btn__icon'> {icon}</span>}
            {label && <span className='btn__label bold'>{label}</span>}
        </button>
    );
};

export default Button;