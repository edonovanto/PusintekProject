import React from 'react';
import defaultImage from '../../../assets/images/default-placeholder.png';

// Components
import EditButton from './EditBarang/EditBarang';
import DeleteButton from './DeleteBarang/DeleteBarang';

function Item({ currentItems }) {
  return (
    <>
      <div class='catalog__list'>
        {currentItems &&
          currentItems.map((val, key, i) => {
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
                    <strong>Rp{val.buying_price.toLocaleString('en')}</strong>
                  </p>
                  <p class='catalog-item__desc m-0'>
                    Harga Jual :{' '}
                    <strong>Rp{val.selling_price.toLocaleString('en')}</strong>
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

    </>
  );
}

export default Item;
