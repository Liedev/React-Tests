import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import IconButton from '../../components/button/IconButton';
import CountryCard from '../../components/card/CountryCard';
import { CountriesContext } from '../../context/countryContext';
import { getCountryByName } from '../../util/endpoints';
import IconName from '../../util/enum/iconName';
import { arrayToNameString } from '../../util/helper/helper';
import { CountryData } from '../../util/type/CountryData'

//const tempdata = { "name": "Afghanistan", "topLevelDomain": [".af"], "alpha2Code": "AF", "alpha3Code": "AFG", "callingCodes": ["93"], "capital": "Kabul", "altSpellings": ["AF", "Afġānistān"], "subregion": "Southern Asia", "region": "Asia", "population": 40218234, "latlng": [33, 65], "demonym": "Afghan", "area": 652230, "timezones": ["UTC+04:30"], "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"], "nativeName": "افغانستان", "numericCode": "004", "flags": { "svg": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg", "png": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png" }, "currencies": [{ "code": "AFN", "name": "Afghan afghani", "symbol": "؋" }], "languages": [{ "iso639_1": "ps", "iso639_2": "pus", "name": "Pashto", "nativeName": "پښتو" }, { "iso639_1": "uz", "iso639_2": "uzb", "name": "Uzbek", "nativeName": "Oʻzbek" }, { "iso639_1": "tk", "iso639_2": "tuk", "name": "Turkmen", "nativeName": "Türkmen" }], "translations": { "br": "Afghanistan", "pt": "Afeganistão", "nl": "Afghanistan", "hr": "Afganistan", "fa": "افغانستان", "de": "Afghanistan", "es": "Afganistán", "fr": "Afghanistan", "ja": "アフガニスタン", "it": "Afghanistan", "hu": "Afganisztán" }, "flag": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg", "regionalBlocs": [{ "acronym": "SAARC", "name": "South Asian Association for Regional Cooperation" }], "cioc": "AFG", "independent": true } as unknown as CountryData

const Country = () => {
    //TODO: Add CountryDetailpage
    const { countryName } = useParams();
    const [country, setCountry] = useState<CountryData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const { countries } = useContext(CountriesContext)

    const navigate = useNavigate();

    const getBorderCountries = (alpha3Codes: string[]) => {

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
        console.log({ name });
        try {
            const res = await fetch(`${getCountryByName}/${name}`);
            if (!res.ok) {
                throw new Error('Something went wrong. Could not get the country.');
            }
            const data: CountryData[] = await res.json();
            const country = data.find((country) => country?.name.toLowerCase() === name.toLowerCase())
            if (!country) {
                throw new Error('Something went wrong. Could not get the country.');
            }
            console.log(country.borders);
            //TODO check aland islands countr
            const newCountry = { ...country, borders: getBorderCountries(country.borders) }
            console.log("country", { data });
            console.log(JSON.stringify(data));
            setCountry(newCountry);
            setLoading(false);
        } catch (error) {
            //TODO: Error Handeling
            console.log(error);
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

    console.log({ country });
    if (loading && !error) {
        return (
            <div className='country__container'>
                {/* If time set loader in middle of screen */}
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <div className='country__container'>
                {error}
            </div>
        )
    }

    return (
        <div className='country__container'>
            <div className='country__back-button-container'>
                <IconButton buttonClass='country__back-button' text={'Back'} handleClick={goBack} iconEnum={IconName.BACKARROW} ></IconButton>
            </div>
            <div className='country__details'>
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
                        <p>Border Countries:</p>
                        <div>
                            {country?.borders.length > 0 ? country.borders.map((borderCountry, idx) =>
                                <IconButton buttonClass='country__data__border-country__btn' key={idx} text={borderCountry} handleClick={() => getBorderCountry(borderCountry)}
                                />
                            ) : <p>No countries found</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Country