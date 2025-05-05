import React, { useEffect, useRef, useState } from 'react';
import { CCard, CCol, CRow } from '@coreui/react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import '../../../scss/sys-prin-configuration/client-information.scss';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ClientInformation = ({ onRowClick, clientList }) => {
  const [tableData, setTableData] = useState([]);
  const gridApiRef = useRef(null);

  useEffect(() => {
    const flattenedData = clientList.map((client) => ({
      client: client.client,
      ...client
    }));

    setTableData(flattenedData);
  }, [clientList]);

  const columnDefs = [
    {
      field: 'client',
      headerName: 'Client ID - Client Name',
      filter: 'agTextColumnFilter',
      width: 300,
      minWidth: 250,
      valueGetter: (params) =>
        params.data?.client && params.data?.name
          ? `${params.data.client} - ${params.data.name}`
          : params.data?.client || '',
      cellRenderer: (params) => (
        <span>
          <span role="img" aria-label="user" style={{ marginRight: '6px' }}>👤</span>
          {params.value}
        </span>
      )
    }
  ];
  

  const defaultColDef = {
    flex: 1,
    resizable: true,
    minWidth: 120,
    sortable: false,
    filter: false,
    floatingFilter: true,
  };

  const handleRowClicked = (event) => {
    const row = event.data;
    if (row && row.client) {
      localStorage.setItem('selectedClient', row.client);
      onRowClick(row);
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <CRow className="flex-grow-1">
        <CCol xs={12} className="d-flex flex-column h-100">
          <CCard className="flex-grow-1 d-flex flex-column">
            <div className="ag-grid-container ag-theme-quartz" style={{ flex: 1, minHeight: 0 }}>
              <AgGridReact
                rowData={tableData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}                 // ✅ Enable pagination
                paginationPageSize={5}           // ✅ Set items per page
                animateRows={true}
                onGridReady={(params) => {
                  gridApiRef.current = params.api;
                }}
                onRowClicked={handleRowClicked}
              />
            </div>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default ClientInformation;
