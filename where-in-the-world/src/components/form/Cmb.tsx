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
    //TODO: Add onBlur
    const handleSelection = (e: BaseSyntheticEvent) => {
        if (e.target.value) {
            props.onSelect(e.target.value);
            setSelectedValue(e.target.value);
        }
        toggle();
    }

    return (
        <>
            <div
                className='custom-select__select'
                onClick={toggle}
            >
                {selectedValue}
                <span className='custom-select__select__icon'> {iconProvider.getImage(IconName.CHEVRONDOWN)}</span>
            </div>
            {isOpen && <div className='custom-select__options'>
                {props.options.map((option: string) => (
                    <button key={option} value={option} onClick={handleSelection}>{option}</button>
                ))}
            </div>}
        </>
    )
}

export default Cmb;