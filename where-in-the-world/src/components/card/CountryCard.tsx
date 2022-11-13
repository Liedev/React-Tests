import React from 'react'

interface CountryCardProps {
    flagUrl: string;
    countryName: string;
    population: number;
    region: string;
    capital: string;
}

const CountryCard = ({ flagUrl, countryName, population, region, capital }: CountryCardProps) => {
    return (
        <div className='country__card'>
            <img className='country__header' src={flagUrl} alt={countryName} />
            <div className='country__body'>
                <div className='country__title'>
                    {countryName}
                </div>
                <ul className='country__list'>
                    <li>
                        Population: {population.toLocaleString()}
                    </li>
                    <li>
                        Region: {region}
                    </li>
                    <li>
                        Capital: {capital}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CountryCard
