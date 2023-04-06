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
                container: (baseStyles, state) => ({
                    ...baseStyles,
                    width: '90%',
                }),
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: 'var(--background-color)',
                    borderColor: state.isFocused ? 'grey' : 'var(--primary-color)',
                }),
                singleValue: (baseStyles, state) => ({
                    ...baseStyles,
                    color: 'var(--onBackground-color)',
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