import React from 'react'
import IconName from '../../util/enum/iconName';
import iconProvider from '../../util/providers/iconProvider';

interface IconButtonProps {
    text: string;
    iconEnum?: IconName;
    buttonClass: string;
    handleClick: () => void;
}

const IconButton = (props: IconButtonProps) => {
    return (
        <button className={`${props.buttonClass}`} onClick={props.handleClick}>
            {props.iconEnum >= 0 && iconProvider.getImage(props.iconEnum)}
            {props.text}
        </button>
    )
}

export default IconButton