// File: SysPrinConfigs.js
import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import './GridSearchSuggestion.css';
import { useClientContext } from '../../../context/ClientContext.js';

ModuleRegistry.registerModules([AllCommunityModule]);

const flattenData = (data) => {
  console.log("Flattening data...", data);
  const result = [];
  data?.forEach(item => {
    item.sysPrins?.forEach(sys => {
      result.push({
        client: item.client,
        name: item.name,
        sysPrin: sys.sysPrin
      });
    });
  });
  console.log("Flattened result:", result);
  return result;
};

const SysPrinConfigs = () => {
  const { clientList = [] } = useClientContext();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const debounceTimer = useRef(null);

  console.log("📦 Context data loaded:", clientList);

  const columnDefs = [
    { field: 'client', headerName: 'Client', rowGroup: true, hide: true },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'sysPrin', headerName: 'SysPrin', flex: 1 },
  ];

  const autoGroupColumnDef = {
    headerName: 'Grouped by Client',
    field: 'client',
    cellRendererParams: { suppressCount: false },
    flex: 1,
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    console.log("🔍 User input:", input);
    setSearchText(input);

    clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      if (input.trim() === '') {
        console.log("📭 Empty input – clearing results.");
        setFilteredData([]);
        setShowGrid(false);
      } else {
        const lowerInput = input.toLowerCase();
        const flat = flattenData(clientList);
        const filtered = flat.filter((item) =>
          item.name?.toLowerCase().includes(lowerInput) ||
          item.sysPrin?.toLowerCase().includes(lowerInput)
        );
        console.log("✅ Filtered result:", filtered);
        setFilteredData(filtered);
        setShowGrid(filtered.length > 0);
      }
    }, 200);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Type to search name or sysPrin..."
        value={searchText}
        onChange={handleInputChange}
        style={{ width: '300px', marginBottom: '1rem', padding: '0.5rem' }}
      />
      {showGrid && (
        <div className="ag-theme-custom">
          <AgGridReact
            rowData={filteredData}
            columnDefs={columnDefs}
            autoGroupColumnDef={autoGroupColumnDef}
            groupDisplayType="singleColumn"
            pagination={true}
            paginationPageSize={5}
            domLayout="autoHeight"
            animateRows={false}
          />
        </div>
      )}
    </div>
  );
};

export default SysPrinConfigs;
