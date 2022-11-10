import React from 'react'
import IconName from '../../util/enum/iconName';
import iconProvider from '../../util/providers/iconProvider';

interface IconButtonProps {
    text: string;
    iconName?: IconName;
    handleClick: () => void;
}

const IconButton = (props: IconButtonProps) => {
    return (
        <button className={'buttonContainer'} onClick={props.handleClick}>
            {props.iconName && iconProvider.getImage(props.iconName)}
            {props.text}
        </button>
    )
}

export default IconButton