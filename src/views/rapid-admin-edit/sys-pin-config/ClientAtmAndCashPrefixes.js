import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  value: `Data ${i + 1}`
}));

const PAGE_SIZE = 16; // 4x4 grid
const COLUMNS = 4;

const PagedGrid = () => {
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(data.length / PAGE_SIZE);
  const pageData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <>
      {/* Grid Table */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
          rowGap: '0px',      // reduced vertical gap
          columnGap: '12px'
        }}
      >
        {pageData.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: 'white',
              minHeight: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontSize: '0.78rem',
              fontWeight: 200,
              padding: '0 16px',
              borderRadius: '0px'
            }}
          >
            {item.value}
          </div>
        ))}
      </div>

      <div
          style={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{ fontSize: '0.7rem', padding: '2px 8px', minWidth: 'unset' }}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </Button>

          <Typography fontSize="0.75rem">
            Page {page + 1} of {pageCount}
          </Typography>

          <Button
            variant="outlined"
            size="small"
            sx={{ fontSize: '0.7rem', padding: '2px 8px', minWidth: 'unset' }}
            onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
            disabled={page === pageCount - 1}
          >
            Next
          </Button>
        </div>
    </>
  );
};

export default PagedGrid;
