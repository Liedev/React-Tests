import React, { useMemo } from 'react'
import CountryCard from '../../components/card/CountryCard';
import Cmb from '../../components/form/Cmb';
import SearchInput from '../../components/form/SearchInput';
import { getAllCountriesURL } from '../../util/endpoints'
import { CountryData } from '../../util/type/CountryData';

const { useState, useEffect } = React;

const Countries = () => {
    //TODO: implement shadows on elements
    const [countries, setCountries] = useState<CountryData[]>([]);
    const [filter, setFilter] = useState<string>("")
    const [regionFilter, setRegionFilter] = useState<string>("")
    const [error, setError] = useState<string>("");

    const getCountries = async () => {
        try {
            const res = await fetch(getAllCountriesURL)
            if (!res.ok) {
                throw new Error('Something went wrong. Could not get all the countries.');
            }
            const data: CountryData[] = await res.json();
            console.log(data);
            //TODO: set data in reducer or use another fetch?
            setCountries(data)
        } catch (error) {
            //TODO: Error Handeling
            console.log(error);
        }
    }

    useEffect(() => {
        getCountries();
    }, [])

    const filteredCountriesByRegion = regionFilter ? countries.filter((country) => country.region.trim().toLowerCase() === regionFilter.toLowerCase()) : countries;
    const filteredCountries = filter ? filteredCountriesByRegion.filter(x => x.name.trim().toLowerCase().includes(filter)) : filteredCountriesByRegion;

    return (
        <div className='countries__container'>
            <div className='countries__filters'>
                <div className='countries__search'>
                    <SearchInput onSearch={setFilter} />
                </div>
                <div className='countries__cmb'>
                    <Cmb
                        name={'regions'}
                        id={'regions'}
                        options={["Africa", "America", "Asia", "Europe", "Oceania"]}
                        onSelect={setRegionFilter}
                        placeHolder={'Filter by Region'}
                    />
                </div>
            </div>
            <div className='countries__cards'>
                {
                    filteredCountries?.map(({ flag,
                        name,
                        population,
                        region,
                        capital }, idx) => (
                        <CountryCard
                            key={idx}
                            flagUrl={flag}
                            countryName={name}
                            population={population}
                            region={region}
                            capital={capital} />
                    ))
                }
            </div>
        </div>
    )
}

export default Countries