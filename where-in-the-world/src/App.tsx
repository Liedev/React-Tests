import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Countries from './pages/countries/Countries';
import IconButton from './components/button/IconButton';
import IconName from './util/enum/iconName';
import Country from './pages/country/Country';

function App() {
  return (
    <>
      <header className='header'>
        <div className='container'>
          <h1>Where in the world</h1>
          <div className='header__toggleTheme'>
            <IconButton handleClick={function (): void {
              alert("TODO: Add dark light functionality with context")
            }} iconName={IconName.MOON} text={'Dark mode'} />
          </div>
        </div>
      </header>
      <div className='container'>
        <Routes>
          <Route path="/" element={< Countries />} />
          <Route path='/:id' element={<Country />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
