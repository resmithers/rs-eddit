import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function Pages({ data }) {
  const {
    content, p, limit, handlePageChange,
  } = data;
  const pages = [];
  const maxPage = Math.ceil(content / limit);
  for (let i = 0; i < maxPage; i++) {
    pages.push(i + 1);
  }
  return (
    <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination.Prev disabled={p <= 1} onClick={() => handlePageChange({ dir: -1 })}>
        {'<'}
      </Pagination.Prev>
      {pages.map(page => (
        <Pagination.Item onClick={e => handlePageChange({ e })} key={page} active={page === p}>
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next disabled={p >= maxPage} onClick={() => handlePageChange({ dir: 1 })}>
        {'>'}
      </Pagination.Next>
    </Pagination>
  );
}
