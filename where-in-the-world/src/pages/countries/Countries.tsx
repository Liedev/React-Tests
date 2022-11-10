import React from 'react'
import CountryCard from '../../components/card/CountryCard';
import { getAllCountriesURL } from '../../util/endpoints'
import { CountryData } from '../../util/type/CountryData';

const { useState, useEffect } = React;

const Countries = () => {

    const [countries, setCountries] = useState<CountryData[]>([]);
    const [error, setError] = useState("");

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


    return (
        <div className='countries__container'>
            <div className='countries__filters'>
                <div>
                    {/* //TODO: Add input field for search in seperate component */}
                </div>
                <div>
                    {/* TODO: Add combobox for regions in seperate component */}
                </div>
            </div>
            <div className='countries__cards'>
                {
                    countries.map(({ flag,
                        name,
                        population,
                        region,
                        capital }) => (
                        <CountryCard
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