import React, { useEffect, useRef, useState } from 'react';
import {
  CCard,
  CCol,
  CRow
} from '@coreui/react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import '../../../scss/sys-prin-configuration/client-information.scss';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ClientInformation = ({
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
  const [pageSize] = useState(20);
  const [expandedGroups, setExpandedGroups] = useState({});
  const gridApiRef = useRef(null);

  const buttonStyle = {
    border: 'none',
    background: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: '#555',
    whiteSpace: 'nowrap', // ensure icon+text don't wrap
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

  const flattenClientData = (clients) => {
    const flattenedData = [];
    const clientsToShow = selectedClient === 'ALL'
      ? clients
      : clients.filter(c => c.client === selectedClient);

    clientsToShow.forEach(clientGroup => {
      const clientId = clientGroup.client;
      const isExpanded = expandedGroups[clientId] ?? false;

      flattenedData.push({
        isGroup: true,
        groupLevel: 1,
        groupLabel: (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-block',
              width: '18px',
              height: '18px',
              border: '1px solid #aaa',
              textAlign: 'center',
              fontSize: '12px',
              lineHeight: '16px',
              borderRadius: '3px',
              userSelect: 'none'
            }}>
              {isExpanded ? '−' : '+'}
            </span>
            <span>{`${clientId} - ${clientGroup.name}`}</span>
          </span>
        ),
        client: clientId,
        ...clientGroup,
        memoType:'Pending'
      });

      if (isExpanded) {
        clientGroup.sysPrins?.forEach(sysPrin => {
          flattenedData.push({
            isGroup: false,
            client: clientId,
            sysPrin: sysPrin.sysPrin,
            name: clientGroup.name,
            address: clientGroup.addr,
            city: clientGroup.city,
            state: clientGroup.state,
            zip: clientGroup.zip,
            contact: clientGroup.contact,
            phone: clientGroup.phone,
            faxNumber: clientGroup.faxNumber,
            billingSp: clientGroup.billingSp,
            excludeFromReport: clientGroup.excludeFromReport,
            positiveReports: clientGroup.positiveReports,
            subClientInd: clientGroup.subClientInd,
            amexIssued: clientGroup.amexIssued,
            reportBreakFlag: clientGroup.reportBreakFlag,
            chLookUpType: clientGroup.chLookUpType,
            active: clientGroup.active,
            sysPrinActive: sysPrin?.active === 'Y'
          });
        });
      }
    });

    const clientGroupsOnly = flattenedData.filter(row => row.isGroup);

    const pagedGroups = isWildcardMode
  ? clientGroupsOnly
  : clientGroupsOnly.slice(0); // force fresh data for paged mode


    const visibleRows = [];

    pagedGroups.forEach(groupRow => {
      visibleRows.push(groupRow);
      if (expandedGroups[groupRow.client]) {
        const children = flattenedData.filter(row => !row.isGroup && row.client === groupRow.client);
        visibleRows.push(...children);
      }
    });

    setTimeout(() => setTableData(visibleRows), 0);

  };

  useEffect(() => {
    flattenClientData(clientList);
  }, [selectedClient, expandedGroups, clientList]);

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
  
    if (isWildcardMode && typeof onFetchWildcardPage === 'function') {
      onFetchWildcardPage(nextPage);
    } else {
      fetch(`http://localhost:4444/api/clients-paging?page=${nextPage}&size=20`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch clients');
          }
          return response.json();
        })
        .then((data) => {
          setClientList([]); // ✅ Clear old page data
          setClientList(data);
          setCurrentPage(nextPage);
        })
        .catch((error) => {
          console.error('Error fetching clients:', error);
        });
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

  const resetClientList = () => {
    setClientList([]);
    setCurrentPage(0);
    fetch(`http://localhost:4444/api/clients-paging?page=0&size=20`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch initial clients');
        }
        return response.json();
      })
      .then((data) => {
        setClientList([]);
        setIsWildcardMode(false);
        setClientList(data);
      })
      .catch((error) => {
        console.error('Reset fetch failed:', error);
      });
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
    filter: true,
    floatingFilter: true,
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
          newState[client.client] = false; // collapse all
        });
  
        // expand clicked one if it wasn't already open
        newState[clientId] = !currentlyExpanded;
  
        return newState;
      });
  
      onRowClick(row); // ✅ send group row to parent
    } else if (!row.isGroup && row.client) {
      localStorage.setItem('selectedClient', row.client);
      onRowClick(row); // ✅ send leaf row to parent
    }
  };
  

  return (
    <div className="d-flex flex-column h-100">
      <CRow className="flex-grow-1">
        <CCol xs={12} className="d-flex flex-column h-100">
        <CCard className="flex-grow-1 d-flex flex-column" style={{ height: '950px', border: 'none', boxShadow: 'none', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
            <div className="ag-grid-container ag-theme-quartz no-grid-border"
                 style={{
                  height: '100%',
                  width: '100%',
                  overflowY: 'auto',     // only vertical scrolling
                  overflowX: 'hidden',   // disables horizontal scrolling
                }}
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
            <div  style={{
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
                <>
                  <div style={{  padding: '4px', textAlign: 'center', background: '#fafafa', display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'nowrap', overflowX: 'hidden', }} >
                    <button
                      onClick={() => setCurrentPage(0)}
                      style={buttonStyle}
                    >
                      ⏮ 
                    </button>
                    <button
                      onClick={goToPreviousPage}
                      style={buttonStyle}
                    >
                      ◀ Previous
                    </button>
                    <button
                      onClick={goToNextPage}
                      style={buttonStyle}
                    >
                      Next ▶
                    </button>
                    <button
                      onClick={() => {
                        const totalPages = Math.ceil(clientList.length / pageSize);
                        setCurrentPage(totalPages - 1);
                      }}
                      style={buttonStyle}
                    >
                       ⏭
                    </button>
                  </div>
                </>
              ) : (
                <button
                onClick={resetClientList}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  color: '#555',
                  whiteSpace: 'nowrap'
                }}
              >
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

export default ClientInformation;
