import React, { useEffect, useState } from 'react';
import './Catalog.css';
import { GET_ALL_STUFF } from '../../../utils/constant';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';

// Component
import ModalCreate from './CreateBarang/CreateBarang';
import PaginatedItems from './PaginatedItems';

function Catalog() {
  const [search, setSearch] = useState('');

  const handleKeyDown = (event, searchedItem) => {
    // event.preventDefault();

    if (event.key === 'Enter') {
      setSearch(searchedItem);
    }
  };

  return (
    <>
      {/* SEARCH INPUT */}
      <div href='#maincontent' tabindex='0' class='hero-search'>
        <div className='hero-search__inner mb-5'>
          <div class='row row-search'>
            <div class='col-12'>
              <div class='inner-addon'>
                <AiOutlineSearch size='2.5em' className='search-barang' />
                <input
                  class='form-control form-control-search'
                  name='search'
                  type='search'
                  results
                  placeholder='Cari barang disini..'
                  onKeyDown={(e) => handleKeyDown(e, e.target.value)}
                />
              </div>
              <div
                className='m-0 create-barang-text'
                data-toggle='modal'
                data-target='#exampleModal'
              >
                Didn't find your item? <strong>Crete Here!</strong>
              </div>
              <ModalCreate />
            </div>
          </div>
        </div>
      </div>

      {/* CATALOG */}
      <div id='maincontent' class='catalog'>
        <div class='catalog__inner'>
          <div class='catalog__headline'>
            <h2 class='catalog__title' tabindex='0'>
              Katalog Barang
            </h2>
            <p class='catalog__desc'>
              Explore berbagai barang pencarianmu disini
            </p>
          </div>

          <PaginatedItems itemsPerPage={8} searchedItem={search} />
        </div>
      </div>
    </>
  );
}

export default Catalog;
