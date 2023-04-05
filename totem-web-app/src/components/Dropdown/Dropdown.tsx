import React from 'react'
import './Dropdown.scss'

import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export default function Dropdown() {

    return (
        <Select 
            options={options} 
            defaultInputValue="chocolate"
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: 'var(--background-color)',
                    borderColor: state.isFocused ? 'grey' : 'var(--primary-color)',
                }),
                container: (baseStyles, state) => ({
                    ...baseStyles,
                    width: '100%',
                }),
                valueContainer: (baseStyles, state) => ({
                    ...baseStyles,
                    color: 'var(--primary-color)',
                }),
                menu: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: 'var(--background-color)',
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.isSelected ? 'var(--background-color)' : 'var(--primary-color)',
                    backgroundColor: state.isSelected ? 'var(--primary-color)' : 'var(--background-color)',
                }),
            }}
        />
    )
}
