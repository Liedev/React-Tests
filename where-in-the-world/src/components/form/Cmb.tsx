import React, { BaseSyntheticEvent, useState } from 'react';
import IconName from '../../util/enum/iconName';
import iconProvider from '../../util/providers/iconProvider';

interface CmbProps {
    name: string;
    id: string;
    options: string[];
    placeHolder: string;
    onSelect: (props: any) => void;
}

const Cmb = (props: CmbProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>(props.placeHolder);

    const toggle = () => {
        setIsOpen(prev => !prev)
    }

    const handleSelection = (e: BaseSyntheticEvent) => {
        if (e.target.innerHTML) {
            props.onSelect(e.target.innerHTML);
            setSelectedValue(e.target.innerHTML);
        }
        toggle();
    }

    return (
        <div
            tabIndex={0}
            onBlur={toggle}>
            <div
                className='custom-select__select'
                onClick={toggle}
            >
                {selectedValue}
                <span className='custom-select__select__icon'> {iconProvider.getImage(IconName.CHEVRONDOWN)}</span>
            </div>
            {isOpen && <ul onFocus={() => console.log("focus")} className='custom-select__options'>
                {props.options.map((option: string) => (
                    <li key={option} onClick={handleSelection}>{option}</li>
                ))}
            </ul>}
        </div>
    )
}

export default Cmb;