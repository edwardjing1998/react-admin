// File: ClientSearchInput.js
import React, { useState, useEffect, useRef } from 'react';
import { CFormInput } from '@coreui/react';
import SearchIcon from '@mui/icons-material/Search';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const ClientSearchInput = ({ input, handleChange, suggestions, handleSelect }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    if (input.trim() === '') {
      setFilteredSuggestions([]);
      setShowGrid(false);
    } else {
      const filtered = suggestions
        .map((item) => {
          const [client, ...nameParts] = item.split(' ');
          return { client, name: nameParts.join(' ') };
        })
        .filter((item) =>
          item.client.toLowerCase().includes(input.toLowerCase()) ||
          item.name.toLowerCase().includes(input.toLowerCase())
        );
      setFilteredSuggestions(filtered);
      setShowGrid(true);
    }
  }, [input, suggestions]);

  const columnDefs = [
    { field: 'client', headerName: 'Client', width: 120 },
    { field: 'name', headerName: 'Name', flex: 1 },
  ];

  const onRowClicked = (event) => {
    const label = `${event.data.client} ${event.data.name}`;
    handleSelect(label);
    setShowGrid(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <CFormInput
        type="text"
        placeholder="Search or input client data..."
        style={{ width: '100%', paddingRight: '40px' }}
        value={input}
        onChange={handleChange}
      />
      <SearchIcon
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#6c757d',
          pointerEvents: 'none',
        }}
      />
      {showGrid && filteredSuggestions.length > 0 && (
        <div
          className="ag-theme-alpine"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 999,
            height: '200px',
            border: '1px solid #ccc',
          }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={filteredSuggestions}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={5}
            domLayout="autoHeight"
            onRowClicked={onRowClicked}
          />
        </div>
      )}
    </div>
  );
};

export default ClientSearchInput;
