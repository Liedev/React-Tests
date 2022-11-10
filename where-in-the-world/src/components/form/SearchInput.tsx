import React from 'react'
import IconName from '../../util/enum/iconName';
import iconProvider from '../../util/providers/iconProvider';

const { useState } = React;

const SearchInput = () => {
    const [input, setInput] = useState('');

    const submitHandler = (e: any) => {
        e.preventdefault();
        //TODO: add logic for searching
        //TODO: set type
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                {iconProvider.getImage(IconName.BACKARROW)}
                {/* TODO: if time i18n */}
                <input
                    type={"text"}
                    placeholder="Search for a country..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
        </form>
    )
}

export default SearchInput