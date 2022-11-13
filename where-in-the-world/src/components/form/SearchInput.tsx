import React, { SyntheticEvent, useRef } from 'react';
import IconName from '../../util/enum/iconName';
import iconProvider from '../../util/providers/iconProvider';

interface SearchInputProps {
    onSearch: (input: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
    const inputRef = useRef<HTMLInputElement>();

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        onSearch(inputRef.current.value)
    }

    return <form onSubmit={submitHandler}>
        <div className='search__container'>
            {iconProvider.getImage(IconName.LOOP)}
            <input
                type={'text'}
                ref={inputRef}
                placeholder='Search for a country...'
            />
        </div>
    </form>

}

export default SearchInput