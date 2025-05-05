import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
} from '@coreui/react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import './Inventory.scss';
import { clientsJson, clientTransactionData } from './data.js';

ModuleRegistry.registerModules([AllCommunityModule]);

const DailyActivity = () => {
  const [selectedOption, setSelectedOption] = useState({ value: 'ALL', label: 'All Clients' });
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientOptions, setClientOptions] = useState([]);
  const [rowData, setRowData] = useState([]);

  // Format today's date as YYYY-MM-DD
  const getTodayDateStr = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Set initial state on load
  useEffect(() => {
    const today = getTodayDateStr();
    setFromDate(today);
    setToDate(today);

    const options = [
      { value: 'ALL', label: 'All Clients' },
      ...clientsJson.map(c => ({
        value: c.client,
        label: `${c.client} - ${c.name}`,
      })),
    ];
    setClientOptions(options);
    filterData('ALL', today, today);
  }, []);

  const filterData = (clientId, from, to) => {
    let filteredData = [];

    if (clientId && clientId !== 'ALL') {
      filteredData = clientTransactionData[clientId] || [];
    } else {
      filteredData = Object.values(clientTransactionData).flat();
    }

    // Apply date range filtering
    if (from && to) {
      const fromDateObj = new Date(from);
      const toDateObj = new Date(to);

      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.dateTime);
        return itemDate >= fromDateObj && itemDate <= toDateObj;
      });
    }

    setRowData(filteredData);
  };

  const handlePreview = () => {
    const clientId = selectedOption?.value || 'ALL';
    filterData(clientId, fromDate, toDate);
  };

  const [colDefs] = useState([
    { field: 'transNo', headerName: 'Transaction No' },
    { field: 'caseNumber', headerName: 'Case Number' },
    { field: 'type', headerName: 'Type' },
    { field: 'commandLine', headerName: 'Command' },
    { field: 'systemType', headerName: 'System' },
    { field: 'retryCount', headerName: 'Retries' },
    { field: 'dateTime', headerName: 'Timestamp' },
    { field: 'cycle', headerName: 'Cycle' },
  ]);

  const defaultColDef = {
    flex: 1,
    filter: true,
    floatingFilter: false,
    sortable: true,
    resizable: true,
  };

  return (
    <div className="daily-activity-wrapper">
      <CCard>
        <CCardBody>
          {/* First Row */}
          <CRow className="mb-3 align-items-center">
            <CCol md={4} className="mb-3 mb-md-0">
              <Select
                options={clientOptions}
                value={selectedOption}
                onChange={setSelectedOption}
                placeholder="Select Client"
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
            </CCol>
            <CCol md={8} className="d-flex justify-content-center gap-2">
              <CButton color="primary">Print</CButton>
              <CButton color="success" variant="outline" onClick={handlePreview}>
                Preview
              </CButton>
              <CButton color="danger" variant="ghost">Cancel</CButton>
            </CCol>
          </CRow>

          {/* Second Row - Date Picker Inputs */}
          <CRow className="mb-5 align-items-end">
            <CCol md={5}>
              <CFormLabel htmlFor="fromDate">From</CFormLabel>
              <CFormInput
                type="date"
                id="fromDate"
                name="fromDate"
                size="sm"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </CCol>
            <CCol md={5} className="ms-auto">
              <CFormLabel htmlFor="toDate">To</CFormLabel>
              <CFormInput
                type="date"
                id="toDate"
                name="toDate"
                size="sm"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </CCol>
          </CRow>

          {/* AG Grid */}
          <div className="ag-grid-container ag-theme-quartz" style={{ height: '600px' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default DailyActivity;
