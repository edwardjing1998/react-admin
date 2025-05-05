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

const ClientInformation = ({ onRowClick, clientList }) => {
  const [selectedClient, setSelectedClient] = useState('ALL');
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [expandedGroups, setExpandedGroups] = useState({});
  const gridApiRef = useRef(null);

  useEffect(() => {
    if (clientList && clientList.length > 0) {
      console.log("Client List Loaded:");
      clientList.forEach(client => {
        console.log(`Client: ${client.client}`);
        console.log("invalidDelivAreas:", client.invalidDelivAreas);
      });
  
      // ✅ Expand all groups by default
      const expandedMap = {};
      clientList.forEach(client => {
        expandedMap[client.client] = true;
      });
      setExpandedGroups(expandedMap);
    }
  }, [clientList]);
  

  useEffect(() => {
    const flattenedData = [];
    const clientsToShow = selectedClient === 'ALL'
      ? clientList
      : clientList.filter(c => c.client === selectedClient);

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
      });

      if (isExpanded) {
        clientGroup.sysPrins?.forEach(sysPrin => {
          const matchedSysPrin = clientGroup.sysPrins?.find(sp => sp.sysPrin === sysPrin.sysPrin);
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
            sysPrinActive: matchedSysPrin?.active === 'Y'
          });
        });
      }
    });

    setTableData(flattenedData);
    setPageSize(flattenedData.length);
  }, [selectedClient, expandedGroups, clientList]);

  const columnDefs = [
    {
      field: 'groupLabel',
      headerName: 'Clients',
      colSpan: (params) => (params.data?.isGroup ? 2 : 1),
      cellRenderer: (params) =>
        params.data?.isGroup
          ? params.data.groupLabel
          : '',
      valueGetter: () => '',
      filter: false,
      flex: 1, // 👈 Half width
    },
    {
      field: 'sysPrin',
      headerName: 'Sys Prin',
      floatingFilter: true,         // ✅ Show floating filter input
      filter: 'agTextColumnFilter',
      width: 200,
      minWidth: 200,
      flex: 2, // 👈 Twice the width of 'Clients'
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
      setExpandedGroups(prev => ({
        ...prev,
        [row.client]: !prev[row.client],
      }));
    } else if (!row.isGroup && row.client) {
      localStorage.setItem('selectedClient', row.client);
      onRowClick(row);
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <CRow style={{ backgroundColor: '#007bff', padding: '10px', color: 'white' }}>
        <CCol xs={3}>
          <div style={{ fontWeight: 'bold' }}></div>
        </CCol>
        <CCol xs={6}>
          <div style={{ fontWeight: 'bold' }}></div>
        </CCol>
        <CCol xs={3}>
          <div style={{ fontWeight: 'bold' }}></div>
        </CCol>
      </CRow>
      <CRow className="flex-grow-1">
        <CCol xs={12} className="d-flex flex-column h-100">
          <CCard className="flex-grow-1 d-flex flex-column">
            <div className="ag-grid-container ag-theme-quartz" style={{ flex: 1, minHeight: 0 }}>
              <AgGridReact
                rowData={tableData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowClassRules={rowClassRules}
                pagination={true}
                paginationPageSize={pageSize}
                suppressScrollOnNewData={true}  // ✅ Prevent grid from scrolling after group expand
                onGridReady={(params) => {
                  gridApiRef.current = params.api;
                }}
                animateRows={true}
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
