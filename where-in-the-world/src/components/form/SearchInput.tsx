import React, { FormEvent, FormEventHandler, SyntheticEvent } from 'react'
import IconName from '../../util/enum/iconName';
import iconProvider from '../../util/providers/iconProvider';

const { useState } = React;

interface SearchInputProps {
    onSearch: (input: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
    //TODO: useref?
    const [input, setInput] = useState<string>('');

    const submitHandler = (e: SyntheticEvent) => {
        console.log("in submithandler");
        e.preventDefault();
        onSearch(input)
    }
    console.log({ input });
    return <form onSubmit={submitHandler}>
        <div className='search__container'>
            {iconProvider.getImage(IconName.LOOP)}
            {/* TODO: if time i18n */}
            <input
                type={"text"}
                placeholder="Search for a country..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    </form>

}

export default SearchInput