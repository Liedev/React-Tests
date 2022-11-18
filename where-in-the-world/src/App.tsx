import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Countries from './pages/countries/Countries';
import IconButton from './components/button/IconButton';
import IconName from './util/enum/iconName';
import Country from './pages/country/Country';
import { CountryData } from './util/type/CountryData';
import { CountriesContext } from './context/countryContext';
import { Theme } from './util/enum/theme';

const App = () => {
  const [countries, setCountries] = useState<{ countries: CountryData[] }>();
  const [theme, setTheme] = useState(Theme.DARK);
  const providerValue = useMemo(() => ({ countries, setCountries }), [countries, setCountries]);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  useEffect(() => {
    document.body.className = theme
  }, [theme])


  return (
    <div id={theme}>
      <header className='header'>
        <div className='header__title'>Where in the world ?</div>
        <div className='header__toggleTheme'>
          <IconButton
            buttonClass='button-container'
            handleClick={toggleTheme}
            iconEnum={theme === Theme.DARK ? IconName.SUN : IconName.MOON}
            text={theme === Theme.DARK ? 'Light Mode' : 'Dark Mode'} />
        </div>
      </header>
      <main className='container'>
        <CountriesContext.Provider value={providerValue}>
          <Routes>
            <Route path='/' element={< Countries />} />
            <Route path='/countryDetails/:countryName' element={<Country />} />
          </Routes>
        </CountriesContext.Provider>
      </main>
    </div>
  );
}

export default App;
