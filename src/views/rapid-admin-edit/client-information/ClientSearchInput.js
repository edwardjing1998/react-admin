import React, { useState, useEffect, useRef } from 'react';
import { CFormInput } from '@coreui/react';
import SearchIcon from '@mui/icons-material/Search';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const ClientSearchInput = ({ input, handleChange, suggestions, handleSelect }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const debounceRef = useRef(null);
  const gridRef = useRef(null);

  const filterSuggestions = (inputValue) => {
    if (inputValue.trim() === '') {
      setFilteredSuggestions([]);
      setShowGrid(false);
      return;
    }

    const filtered = suggestions
      .map((item) => {
        const [client, ...nameParts] = item.split(' ');
        return { client, name: nameParts.join(' ') };
      })
      .filter((item) =>
        item.client.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );

    setFilteredSuggestions(filtered);
    setShowGrid(filtered.length > 0);
  };

  // Debounce logic to avoid filtering on every keystroke
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      filterSuggestions(input);
    }, 250); // Adjust debounce time if needed

    return () => clearTimeout(debounceRef.current);
  }, [input]);

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
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 999,
            height: '240px',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            fontSize: '14px',
            paddingTop: '4px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 8px' }}>
            <button
              onClick={() => alert('Load more suggestions...')}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                fontSize: '13px',
                marginBottom: '4px',
              }}
            >
              more ...
            </button>
          </div>

          <AgGridReact
            ref={gridRef}
            rowData={filteredSuggestions}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={5}
            domLayout="autoHeight"
            onRowClicked={onRowClicked}
            suppressCellFocus={true}
            paginationPageSizeSelector={[5, 10, 20, 50]}
            headerHeight={30}
            rowHeight={30}
          />
        </div>
      )}
    </div>
  );
};

export default ClientSearchInput;
