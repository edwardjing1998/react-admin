import React, { useEffect, useRef, useState } from 'react';
import { CCard, CCol, CRow } from '@coreui/react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import '../../../scss/sys-prin-configuration/client-information.scss';
import { FlattenClientData } from './utils/FlattenClientData'; // ✅ Import your new utility
import { fetchClientsByPage, resetClientListService } from './utils/ClientService';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const NavigationPanel = ({
  onRowClick,
  clientList,
  setClientList,
  currentPage,
  setCurrentPage,
  isWildcardMode,
  setIsWildcardMode,
  onFetchWildcardPage
}) => {
  const [selectedClient, setSelectedClient] = useState('ALL');
  const [tableData, setTableData] = useState([]);
  const [pageSize] = useState(25);
  const [expandedGroups, setExpandedGroups] = useState({});
  const gridApiRef = useRef(null);


  const buttonStyle = {
    border: 'none',
    background: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: '#555',
    whiteSpace: 'nowrap',
  };

  useEffect(() => {
    setExpandedGroups((prev) => {
      const next = {};
      clientList.forEach(client => {
        const id = client.client;
        next[id] = prev[id] ?? false;
      });
      return next;
    });
  }, [clientList]);

  // ✅ Use the imported flatten utility
  useEffect(() => {
    const flattened = FlattenClientData(clientList, selectedClient, expandedGroups, isWildcardMode);
    setTableData(flattened);
  }, [selectedClient, expandedGroups, clientList, isWildcardMode]);

  const goToNextPage = async () => {
    const nextPage = currentPage + 1;
    if (isWildcardMode && typeof onFetchWildcardPage === 'function') {
      onFetchWildcardPage(nextPage);
    } else {
      try {
        const data = await fetchClientsByPage(nextPage, pageSize);
        setClientList([]);  // Clear old data
        setClientList(data);
        setCurrentPage(nextPage);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }
  };
  
  const goToPreviousPage = () => {
    const previousPage = Math.max(0, currentPage - 1);
    if (isWildcardMode && typeof onFetchWildcardPage === 'function') {
      onFetchWildcardPage(previousPage);
    } else {
      setCurrentPage(previousPage);
    }
  };

  const resetClientList = async () => {
    try {
      const data = await resetClientListService(pageSize);
      setClientList([]);  // Clear old data
      setIsWildcardMode(false);
      setClientList(data);
      setCurrentPage(0);
    } catch (error) {
      console.error('Reset fetch failed:', error);
    }
  };
  

  const columnDefs = [
    {
      field: 'groupLabel',
      headerName: 'Clients',
        colSpan: (params) => (params.data?.isGroup ? 2 : 1),
        cellRenderer: (params) =>
        params.data?.isGroup ? params.data.groupLabel : '',
        valueGetter: (params) =>
        params.data?.isGroup ? `${params.data.client} - ${params.data.name}` : '',
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: 'sysPrin',
      headerName: 'Sys Prin',
      width: 200,
      minWidth: 200,
      flex: 2,
      cellRenderer: (params) => {
        if (params.data?.isGroup) return '';
        return (
          <span>
            <span role="img" aria-label="gear" style={{ marginRight: '6px' }}>⚙️</span>
            {params.value}
          </span>
        );
      },
      valueGetter: (params) => params.data?.isGroup ? '' : params.data.sysPrin,
    }
  ];

  const defaultColDef = {
    flex: 1,
    resizable: true,
    minWidth: 120,
    sortable: false,
    filter: false,
    floatingFilter: false,
  };

  const rowClassRules = {
    'client-group-row': (params) => params.data?.isGroup && params.data?.groupLevel === 1,
  };

  const handleRowClicked = (event) => {

        const row = event.data;
        if (row.isGroup && row.client) {
          const clientId = row.client;
          setExpandedGroups((prev) => {
            const currentlyExpanded = prev[clientId] ?? false;
            const newState = {};
            clientList.forEach(client => {
              newState[client.client] = false;
            });
            newState[clientId] = !currentlyExpanded;
            return newState;
          });
          onRowClick(row);
          } else if (!row.isGroup && row.client) {
            onRowClick(row);
          }
  };

  return (
    <div className="d-flex flex-column h-100">
      <CRow className="flex-grow-1">
        <CCol xs={12} className="d-flex flex-column h-100">
          <CCard className="flex-grow-1 d-flex flex-column" style={{ height: '1200px', border: 'none', boxShadow: 'none', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div className="ag-grid-container ag-theme-quartz no-grid-border"
                style={{ height: '100%', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  rowClassRules={rowClassRules}
                  pagination={false}
                  suppressScrollOnNewData={true}
                  onGridReady={(params) => { gridApiRef.current = params.api; }}
                  animateRows={true}
                  onRowClicked={handleRowClicked}
                />
              </div>
            </div>
            <div style={{
              padding: '4px', background: '#fafafa', display: 'flex',
              justifyContent: 'center', alignItems: 'center',
              columnGap: '4px', flexWrap: 'nowrap', overflowX: 'hidden'
            }}>
              {!isWildcardMode ? (
                <div style={{ padding: '4px', textAlign: 'center', background: '#fafafa', display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'nowrap', overflowX: 'hidden' }}>
                  <button onClick={() => setCurrentPage(0)} style={buttonStyle}>⏮</button>
                  <button onClick={goToPreviousPage} style={buttonStyle}>◀ Previous</button>
                  <button onClick={goToNextPage} style={buttonStyle}>Next ▶</button>
                  <button onClick={() => setCurrentPage(Math.ceil(clientList.length / pageSize) - 1)} style={buttonStyle}>⏭</button>
                </div>
              ) : (
                <button onClick={resetClientList} style={buttonStyle}>🔁 Reset</button>
              )}
            </div>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default NavigationPanel;
