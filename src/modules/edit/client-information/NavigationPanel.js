import React, { useEffect, useRef, useState } from 'react';
import { CCard, CCol, CRow } from '@coreui/react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import '../../../scss/sys-prin-configuration/client-information.scss';
import { FlattenClientData } from './utils/FlattenClientData';
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
  onFetchWildcardPage,
  onFetchGroupDetails // ✅ New prop: Function to fetch selectedGroupRow
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

  // Initialize expandedGroups keys whenever clientList changes
  useEffect(() => {
    setExpandedGroups((prev) => {
      const next = {};
      clientList.forEach((client) => {
        next[client.client] = prev[client.client] ?? false;
      });
      return next;
    });
  }, [clientList]);

  // Flatten whenever dependencies change
  useEffect(() => {
    const flattened = FlattenClientData(
      clientList,
      selectedClient,
      expandedGroups,
      isWildcardMode
    );
    setTableData(flattened);
  }, [clientList, selectedClient, expandedGroups, isWildcardMode]);

  const goToNextPage = async () => {
    const nextPage = currentPage + 1;
    if (isWildcardMode && typeof onFetchWildcardPage === 'function') {
      // If in wildcard mode, delegate to the parent callback
      onFetchWildcardPage(nextPage);
    } else {
      try {
        const data = await fetchClientsByPage(nextPage, pageSize);
        setClientList([]);       // clear old data first
        setClientList(data);
        setCurrentPage(nextPage);
      } catch (error) {
        console.error('Error fetching clients:', error);
        alert(`Error fetching client details: ${error.message}`);

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
      setClientList([]); 
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
      cellRenderer: (params) => (params.data?.isGroup ? params.data.groupLabel : ''),
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
            <span role="img" aria-label="gear" style={{ marginRight: '6px' }}>
              ⚙️
            </span>
            {params.value}
          </span>
        );
      },
      valueGetter: (params) => (params.data?.isGroup ? '' : params.data.sysPrin),
    },
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
    
       // Defer all state changes until after Ag-Grid finishes painting:
       setTimeout(() => {
         if (row.isGroup && row.client) {
           const clientId = row.client;
    
           // 1) Toggle “” expansion for this group (collapsing all others):
           setExpandedGroups((prev) => {
             const currentlyExpanded = prev[clientId] ?? false;
             const newState = {};
             clientList.forEach((c) => {
               newState[c.client] = false;
             });
             newState[clientId] = !currentlyExpanded;
             return newState;
           });
    
           // 2) Immediately tell the parent “a group row was clicked”:
           //    so ClientInformationPage.selectedGroupRow is not null right away.
           if (onRowClick) {
             onRowClick({ ...row });
           }
    
           // 3) Then fire off the real API call for full details:
           if (onFetchGroupDetails) {
             onFetchGroupDetails(clientId);
           }
    
         } else if (!row.isGroup && row.client) {
           // Leaf (non‐group) rows still just call onRowClick(row)
           if (onRowClick) {
             onRowClick(row);
           }
         }
      }, 0);
     };
    

  return (
    <div className="d-flex flex-column h-100">
      <CRow className="flex-grow-1">
        <CCol xs={12} className="d-flex flex-column h-100">
          <CCard
            className="flex-grow-1 d-flex flex-column"
            style={{
              height: '1200px',
              border: 'none',
              boxShadow: 'none',
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div
                className="ag-grid-container ag-theme-quartz no-grid-border"
                style={{ height: '100%', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  rowClassRules={rowClassRules}
                  pagination={false}
                  suppressScrollOnNewData={true}
                  onGridReady={(params) => {
                    gridApiRef.current = params.api;
                  }}
                  animateRows={true}
                  onRowClicked={handleRowClicked}
                />
              </div>
            </div>

            <div
              style={{
                padding: '4px',
                background: '#fafafa',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '4px',
                flexWrap: 'nowrap',
                overflowX: 'hidden',
              }}
            >
              {!isWildcardMode ? (
                <div
                  style={{
                    padding: '4px',
                    textAlign: 'center',
                    background: '#fafafa',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '4px',
                    flexWrap: 'nowrap',
                    overflowX: 'hidden',
                  }}
                >
                  <button onClick={() => setCurrentPage(0)} style={buttonStyle}>
                    ⏮
                  </button>
                  <button onClick={goToPreviousPage} style={buttonStyle}>
                    ◀ Previous
                  </button>
                  <button onClick={goToNextPage} style={buttonStyle}>
                    Next ▶
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.ceil(clientList.length / pageSize) - 1)
                    }
                    style={buttonStyle}
                  >
                    ⏭
                  </button>
                </div>
              ) : (
                <button onClick={resetClientList} style={buttonStyle}>
                  🔁 Reset
                </button>
              )}
            </div>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default NavigationPanel;
