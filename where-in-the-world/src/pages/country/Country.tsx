import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import IconButton from '../../components/button/IconButton';
import { CountriesContext } from '../../context/countryContext';
import { getAllCountriesURL, getCountryByNameURL } from '../../util/endpoints';
import IconName from '../../util/enum/iconName';
import { arrayToNameString } from '../../util/helper/helper';
import { CountryData } from '../../util/type/CountryData'

const Country = () => {
    const errorMessage = 'Something went wrong. Could not get the country.';
    const { countryName } = useParams();
    const [country, setCountry] = useState<CountryData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { countries } = useContext(CountriesContext)

    const navigate = useNavigate();

    const getBorderCountries = (countries: CountryData[], alpha3Codes: string[]) => {
        if (!alpha3Codes) return [];
        let borderCountries = []
        for (const alpha3Code of alpha3Codes) {
            const countryName = countries?.find((country: CountryData) => country.alpha3Code.toLowerCase() === alpha3Code.toLowerCase())?.name;
            if (countryName) {
                borderCountries.push(countryName);
            }
        }
        return borderCountries;
    }

    const getBorderCountry = useCallback((countryName: string) => navigate(`/countryDetails/${countryName}`, { replace: false }), [navigate]);

    const getCountry = async (name: string = countryName) => {
        try {
            const data = await Promise.all([countries ? countries :
                fetch(getAllCountriesURL)
                    .then((response) => response.json())
                    .catch(() => { throw new Error(errorMessage) }),
            fetch(`${getCountryByNameURL}/${name}`)
                .then((response) => response.json())
                .catch(() => { throw new Error(errorMessage) })
            ])
            const [countriesData, countryData] = data;
            const country: CountryData = countryData.find((country: CountryData) => country?.name.toLowerCase() === name.toLowerCase())
            if (!country) {
                throw new Error('Something went wrong. Could not get the country.');
            }
            const newCountry = { ...country, borders: getBorderCountries(countriesData, country.borders) }
            setCountry(newCountry);
            setLoading(false);
        } catch (error) {
            setError(error);
        }
    }

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        setLoading(true);
        getCountry();
    }, [navigate])

    if (loading && !error) {
        return (
            <div className='country__container'>
                <span className='loading-and-error'>Loading...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className='country__container'>
                <span className='loading-and-error'>{error}</span>
            </div>
        )
    }

    return (
        <div className='country__container'>
            <header className='country__back-button-container'>
                <IconButton buttonClass='country__back-button' text={'Back'} handleClick={goBack} iconEnum={IconName.BACKARROW} ></IconButton>
            </header>
            <section className='country__details'>
                <div className='country__flag'>
                    <img src={country?.flag} alt={country?.name} />
                </div>
                <div className='country__data'>
                    <h1>
                        {country?.name}
                    </h1>
                    <div className='country__data__lists'>
                        <ul>
                            <li>Native Name: <span>{country?.nativeName}</span></li>
                            <li>Population: <span>{country?.population.toLocaleString()}</span></li>
                            <li>Region: <span>{country?.region}</span></li>
                            <li>Sub Region: <span>{country?.subregion}</span></li>
                            <li>Capital: <span>{country?.capital}</span></li>
                        </ul>
                        <ul>
                            <li>Top Level Domain: <span>{country?.topLevelDomain}</span></li>
                            <li>Currencies: <span>{country?.currencies && arrayToNameString(country.currencies)}</span></li>
                            <li>Languages: <span>{country?.languages && arrayToNameString(country.languages)}</span></li>
                        </ul>
                    </div>
                    <div className='country__data__border-countries__container'>
                        <div>Border Countries:</div>
                        <div>
                            {country?.borders.length > 0 ? country.borders.map((borderCountry, idx) =>
                                <IconButton buttonClass='country__data__border-country__btn' key={idx} text={borderCountry} handleClick={() => getBorderCountry(borderCountry)}
                                />
                            ) : <p>No countries found</p>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Country