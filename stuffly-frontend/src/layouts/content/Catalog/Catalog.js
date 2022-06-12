import React, { useEffect, useState } from 'react';
import './Catalog.css';
import defaultImage from '../../../assets/images/default-placeholder.png';
import { GET_ALL_STUFF } from '../../../utils/constant';
import axios from 'axios';
import {
  AiOutlineSearch,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
} from 'react-icons/ai';

// Component
import ModalCreate from './CreateBarang/CreateBarang';
import EditButton from './EditBarang/EditBarang';
import DeleteButton from './DeleteBarang/DeleteBarang';

function Catalog() {
  const [search, setSearch] = useState('');
  const [barang, setBarang] = useState([]);
  const [page, setPage] = useState({
    current_page: 0,
    last_page: 0,
  });

  useEffect(() => {
    const config = {
      method: 'get',
      url: GET_ALL_STUFF,
    };

    axios(config).then((res) => {
      const stuffData = res.data.data;
      setPage({
        current_page: res.data.meta.current_page,
        last_page: res.data.meta.last_page,
      });

      setBarang(
        stuffData.filter((val) => {
          if (search == '') {
            return val;
          } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
            return val;
          }
        })
      );
    });
  }, [search]);

  const nextPage = () => {
    const config = {
      method: 'get',
      url: `${GET_ALL_STUFF}?page=${page.current_page + 1}`,
    };

    axios(config).then((res) => {
      console.log(res);
      setBarang(res.data.data);
      setPage({
        current_page: res.data.meta.current_page,
        last_page: res.data.meta.last_page,
      });
    });
  };

  const previousPage = () => {
    const config = {
      method: 'get',
      url: `${GET_ALL_STUFF}?page=${page.current_page - 1}`,
    };

    axios(config).then((res) => {
      console.log(res);
      setBarang(res.data.data);
      setPage({
        current_page: res.data.meta.current_page,
        last_page: res.data.meta.last_page,
      });
    });
  };

  return (
    <>
      {/* SEARCH INPUT */}
      <div href='#maincontent' tabindex='0' class='hero-search'>
        <div className='hero-search__inner'>
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
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div
                className='m-0 create-barang-text'
                data-toggle='modal'
                data-target='#exampleModal'
              >
                Tidak ada barang? <strong>Buat disini</strong>
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
          <div class='catalog__list'>
            {barang &&
              barang.map((val, key, i) => {
                let date_format = new Date(val.updated_at)
                  .toUTCString()
                  .slice(0, 16);
                return (
                  <div
                    class='catalog-item'
                    tabindex='0'
                    aria-label={`daftar barang ${key + 1}`}
                    key={key}
                  >
                    <img
                      src={val.image_url || defaultImage}
                      alt={`stuff item no ${key + 1}`}
                      class='catalog-item__image'
                    />
                    <div class='catalog-item__inner'>
                      <p class='catalog-item__name'>{val.name}</p>
                      <p class='catalog-item__desc m-0'>
                        Harga Beli :{' '}
                        <strong>
                          Rp{val.buying_price.toLocaleString('en')}
                        </strong>
                      </p>
                      <p class='catalog-item__desc m-0'>
                        Harga Jual :{' '}
                        <strong>
                          Rp{val.selling_price.toLocaleString('en')}
                        </strong>
                      </p>
                      <div className='catalog-item__bottom'>
                        <p class='catalog-item__date'>{date_format}</p>
                        <div className='text-right'>
                          <EditButton barang_id={val.id} />
                          <DeleteButton barang_id={val.id} />
                        </div>
                      </div>
                      <p class='catalog-item__rating'>{val.stock}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          {barang.length === 0 && (
            <div className='catalog__none__inner'>
              <p className='catalog__none'>
                <i>"Tidak ada barang"</i>
              </p>
            </div>
          )}
          {/* {barang.length !== 0 && search === '' && ( */}
            <p className='text-center p-4 m-0'>
              {page.last_page === page.current_page && (
                <AiOutlineCaretLeft
                  size='1em'
                  className='next-page'
                  onClick={previousPage}
                />
              )}
              Page {page.current_page} of {page.last_page}
              {'  '}
              {page.last_page - page.current_page > 0 && (
                <AiOutlineCaretRight
                  size='1em'
                  onClick={nextPage}
                  className='next-page'
                />
              )}
            </p>
          {/* )} */}
        </div>
      </div>
    </>
  );
}

export default Catalog;
