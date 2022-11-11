import React, { useMemo, useState } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Countries from './pages/countries/Countries';
import IconButton from './components/button/IconButton';
import IconName from './util/enum/iconName';
import Country from './pages/country/Country';
import { CountryData } from './util/type/CountryData';
import { CountriesContext } from './context/countryContext';

const App = () => {
  const [countries, setCountries] = useState<CountryData[]>()

  const providerValue = useMemo(() => ({ countries, setCountries }), [countries, setCountries])

  return (
    <>
      <header className='header'>
        <div className='container'>
          <h1>Where in the world ?</h1>
          <div className='header__toggleTheme'>
            <IconButton buttonClass='button-container' handleClick={function (): void {
              alert("TODO: Add dark light functionality with context")
            }} iconEnum={IconName.MOON} text={'Dark mode'} />
          </div>
        </div>
      </header>
      <div className='container'>
        <CountriesContext.Provider value={providerValue}>
          <Routes>
            <Route path="/" element={< Countries />} />
            <Route path='/countryDetails/:countryName' element={<Country />} />
          </Routes>
        </CountriesContext.Provider>
      </div>
    </>
  );
}

export default App;
