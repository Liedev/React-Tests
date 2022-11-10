import React from 'react'

interface CmbProps {
    name: string;
    id: string;
    options: string[];
    placeHolder: string;
    onSelect: (props: any) => void;
}

const Cmb = (props: CmbProps) => {
    //TODO: Style Cmb
    const selectionHandler = (e: any) => {
        //TODO: Add type
        props.onSelect(e.target.value);
    }

    return (
        <select
            name={props.name}
            id={props.id}
            onChange={selectionHandler}
            defaultValue={props.placeHolder}
        >
            <option key={"placeholder"} disabled value={props.placeHolder}>{props.placeHolder}</option>
            {
                props.options.map((option: any) => (
                    <option key={option} value={option}>{option}</option>
                ))
            }
        </select>
    )
}

export default Cmb;