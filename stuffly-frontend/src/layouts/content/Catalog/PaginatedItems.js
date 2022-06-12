import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { GET_ALL_STUFF } from '../../../utils/constant';
import Item from './Item';
import './PaginationItems.css';

function PaginatedItems({ itemsPerPage, searchedItem }) {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(true);

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    const config = {
      method: 'GET',
      url: GET_ALL_STUFF,
    };

    axios(config).then((res) => {
      let itemsArray = res.data.data;
      let filteredItemsArray = [];

      setItems(
        itemsArray.filter((filteredItems) => {
          if (searchedItem === '') {
            filteredItemsArray.push(filteredItems);
            return filteredItems;
          } else if (
            filteredItems.name
              .toLowerCase()
              .includes(searchedItem.toLowerCase())
          ) {
            filteredItemsArray.push(filteredItems);
            return filteredItems;
          }
        })
      );

      if (searchedItem === '') {
        setCurrentItems(filteredItemsArray.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredItemsArray.length / itemsPerPage));
        setPagination(true);
      } else {
        setCurrentItems(filteredItemsArray.slice(0, endOffset));
        setPagination(false);
      }
    });
  }, [searchedItem, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    if (searchedItem === '') {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    }
  };

  return (
    <>
      <Item currentItems={currentItems} />
      {items.length === 0 && (
        <div className='catalog__none__inner'>
          <p className='catalog__none'>
            <i>"Tidak ada barang"</i>
          </p>
        </div>
      )}
      {pagination && (
        <div className='pagination-class my-3'>
          <ReactPaginate
            breakLabel='...'
            nextLabel='>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel='<'
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </>
  );
}

export default PaginatedItems;
