import React, { useState } from 'react';
import './Hero.css';

function Hero(props) {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className='h'>
        <div class='hero'>
          <div class='hero__inner'>
            <h1 class='hero__title'>
              Warehouse <br />
              Management System
            </h1>
            <p class='hero__tagline'>
              A simple system to manage some stuff. Created for Pusintek Project
              2022.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
