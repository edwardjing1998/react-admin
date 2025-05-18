import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  value: `Data ${i + 1}`
}));

const PAGE_SIZE = 16; // 4x4 grid
const ROWS = 4;
const COLUMNS = 4;

const PagedGrid = () => {
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(data.length / PAGE_SIZE);
  const pageData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <Box p={2}>
      {/* Grid Table */}
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${COLUMNS}, 1fr)`}
        gap={2}
      >
        {pageData.map((item) => (
          <Box
            key={item.id}
            p={1.5}
            sx={{
              backgroundColor: 'white', // ✅ white background
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start', // ✅ left-aligned text
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            {item.value}
          </Box>
        ))}
      </Box>

      {/* Pagination Controls */}
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Typography>Page {page + 1} of {pageCount}</Typography>
        <Button
          variant="outlined"
          onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
          disabled={page === pageCount - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PagedGrid;
