import React, { ChangeEvent } from "react";

// create a custom type for my custom select menu props
type SelectMenuProps = {
    options: string[];
    onChange: (value: any) => void;
    value: string;
    label: string;
    disabled?: boolean;
    className?: string;
    id?: string;
};


function SelectMenu( props: SelectMenuProps){
    const { options, onChange, value, label, disabled, className, id } = props;

    return (
        <>
        <label className={className} htmlFor={id}></label>
            
        <select className={className} value={value} disabled={disabled} id={id} onChange={onChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        </>        
    );
}

export default SelectMenu;