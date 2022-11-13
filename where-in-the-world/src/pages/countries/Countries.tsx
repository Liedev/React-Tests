import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import CountryCard from '../../components/card/CountryCard';
import Cmb from '../../components/form/Cmb';
import SearchInput from '../../components/form/SearchInput';
import { CountriesContext } from '../../context/countryContext';
import { getAllCountriesURL } from '../../util/endpoints'
import { CountryData } from '../../util/type/CountryData';

const { useState, useEffect } = React;

const Countries = () => {
    const COUNTRYREGION = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const [filter, setFilter] = useState<string>('')
    const [regionFilter, setRegionFilter] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { countries, setCountries } = useContext(CountriesContext);

    const getCountries = async () => {
        try {
            const res = await fetch(getAllCountriesURL)

            if (!res.ok) {
                throw new Error('Something went wrong. Could not get all the countries.');
            }
            const data: CountryData[] = await res.json();

            setCountries(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error)
        }
    }

    useEffect(() => {
        if (!countries) {
            setLoading(true);
            getCountries();
        }
    }, [])

    const filteredCountriesByRegion: CountryData[] = regionFilter ? countries.filter((country: CountryData) => country.region.trim().toLowerCase() === regionFilter.toLowerCase()) : countries;
    const filteredCountries: CountryData[] = filter ? filteredCountriesByRegion.filter((region: any) => region.name.trim().toLowerCase().includes(filter)) : filteredCountriesByRegion;

    if (error) {
        return (
            <div className='country__container'>
                {error}
            </div>
        )
    }

    return (
        <div className='countries__container'>
            <header className='countries__filters'>
                <div className='countries__search'>
                    <SearchInput onSearch={setFilter} />
                </div>
                <div className='countries__cmb'>
                    <Cmb
                        name={'regions'}
                        id={'regions'}
                        options={COUNTRYREGION}
                        onSelect={setRegionFilter}
                        placeHolder={'Filter by Region'}
                    />
                </div>
            </header>
            <section className='countries__cards'>
                {
                    loading && !error ?
                        <p>Loading...</p> :
                        filteredCountries?.map(({
                            flag,
                            name,
                            population,
                            region,
                            capital }, idx) => (
                            <Link key={`link ${idx}`} to={`/countryDetails/${name}`}>
                                <CountryCard
                                    key={idx}
                                    flagUrl={flag}
                                    countryName={name}
                                    population={population}
                                    region={region}
                                    capital={capital} />
                            </Link>
                        ))
                }
            </section>
        </div>
    )
}

export default Countries