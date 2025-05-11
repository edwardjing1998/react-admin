import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CFormLabel,
  CFormInput
} from '@coreui/react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { exportToCsv } from '../../../utils/reports/exportToCsv.js';

ModuleRegistry.registerModules([AllCommunityModule]);

const optionalCols = [
  { field: 'client', headerName: 'Client', show: true },
  { field: 'name', headerName: 'Client Name', show: true },
  { field: 'caseNumber', headerName: 'Case No', show: true },
  { field: 'account', headerName: 'Account', show: true },
  { field: 'lastName', headerName: 'Last Name', show: false },
  { field: 'firstName', headerName: 'First Name', show: false },
  { field: 'addr1Tx', headerName: 'Address 1', show: true },
  { field: 'addr2Tx', headerName: 'Address 2', show: false },
  { field: 'cityTx', headerName: 'City', show: true },
  { field: 'stateTx', headerName: 'State', show: true },
  { field: 'zipCd', headerName: 'Zip', show: true },
  { field: 'actionReason', headerName: 'Reason', show: false },
  { field: 'dateTime', headerName: 'Date Time', show: true },
  { field: 'piId', headerName: 'PI ID', show: false },
  { field: 'sysPrin', headerName: 'Sys Prin', show: false }
];

const AddressChange = () => {
  const [selectedOption, setSelectedOption] = useState(['ALL']);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientOptions, setClientOptions] = useState([]);
  const [rowData, setRowData] = useState([]);

  const defaultColDef = {
    flex: 1,
    filter: true,
    floatingFilter: false,
    sortable: true,
    resizable: true,
  };

  const getTodayDateStr = () => new Date().toISOString().split('T')[0];
  const getOneMonthAgoDateStr = () => {
    const today = new Date();
    const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
    return oneMonthAgo.toISOString().split('T')[0];
  };

  useEffect(() => {
    const today = getTodayDateStr();
    const oneMonthAgo = getOneMonthAgoDateStr();
    setFromDate(oneMonthAgo);
    setToDate(today);

    fetch('http://localhost:4444/api/client-search')
      .then(res => res.json())
      .then(data => {
        setClientOptions([
          { value: 'ALL', label: 'All Clients' },
          ...data.map(c => ({ value: c.client, label: `${c.client} - ${c.name}` })),
        ]);
      });
  }, []);

  const handleSearch = () => {
    const client = selectedOption.includes('ALL') ? '' : selectedOption[0];
    const queryParams = new URLSearchParams({
      fromDate: `${fromDate}T00:00:00`,
      toDate: `${toDate}T23:59:59`,
      client,
    });

    fetch(`http://localhost:4444/api/account-transaction-report?${queryParams}`)
      .then(res => res.json())
      .then(data => {
        const enriched = data.map((item, index) => ({ ...item, rowId: `row_${index}` }));
        setRowData(enriched);
      });
  };

  const handleExportCSV = () => {
    const headers = optionalCols.filter(col => col.show).map(col => col.headerName);
    const fields = optionalCols.filter(col => col.show).map(col => col.field);

    exportToCsv({
      data: rowData,
      headers,
      fields,
      fileName: 'account_transaction_report.csv',
    });
  };

  return (
    <div className="daily-activity-wrapper">
      <CCard>
        <CCardBody>
          <CRow className="mb-5 align-items-end">
            <CCol md={4} className="mb-3 mb-md-0 mt-3">
              <div className="d-flex align-items-center gap-2">
                <CFormLabel htmlFor="fromDate" className="mb-0">From</CFormLabel>
                <CFormInput type="date" id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              </div>
            </CCol>
            <CCol md={4} className="mb-3 mb-md-0 mt-3">
              <div className="d-flex align-items-center gap-2">
                <CFormLabel htmlFor="toDate" className="mb-0">To</CFormLabel>
                <CFormInput type="date" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
              </div>
            </CCol>
            <CCol md={4} className="mt-3">
              <div className="d-flex flex-wrap justify-content-end gap-2">
                <CButton color="dark" onClick={handleExportCSV}>📄 Export to CSV</CButton>
              </div>
            </CCol>
          </CRow>

          <CRow className="mb-5 align-items-center">
            <CCol md={4} className="mb-3 mb-md-0">
              <FormControl fullWidth size="small">
                <InputLabel id="client-select-label">Select Client</InputLabel>
                <Select
                  labelId="client-select-label"
                  multiple
                  value={selectedOption}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.includes('ALL')) {
                      setSelectedOption(['ALL']);
                    } else {
                      setSelectedOption(value.filter(v => v !== 'ALL'));
                    }
                  }}
                  input={<OutlinedInput label="Select Client" />}
                  renderValue={(selected) =>
                    selected.map(val => clientOptions.find(o => o.value === val)?.label || val).join(', ')
                  }
                >
                  {clientOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      <Checkbox checked={selectedOption.includes(opt.value)} />
                      <ListItemText primary={opt.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CCol>
            <CCol md={8} className="mt-3 d-flex justify-content-end">
              <CButton color="info" onClick={handleSearch}>🔍 Search</CButton>
            </CCol>
          </CRow>

          <div className="ag-grid-container ag-theme-quartz mt-5" style={{ height: '600px' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={optionalCols.filter(c => c.show)}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              getRowId={(params) => params.data.rowId}
            />
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default AddressChange;
