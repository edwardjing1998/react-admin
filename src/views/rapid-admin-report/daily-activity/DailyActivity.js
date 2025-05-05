import React, { useState, useEffect } from 'react';
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
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import './DailyActivity.scss';
import { clientsJson, clientTransactionData } from './data.js';

ModuleRegistry.registerModules([AllCommunityModule]);

const DailyActivity = () => {
  const [selectedOption, setSelectedOption] = useState(['ALL']);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientOptions, setClientOptions] = useState([]);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    // Set default range: March 1 to April 1, 2025
    const defaultFrom = '2025-03-01';
    const defaultTo = '2025-04-01';

    setFromDate(defaultFrom);
    setToDate(defaultTo);

    const options = [
      { value: 'ALL', label: 'All Clients' },
      ...clientsJson.map(c => ({
        value: c.client,
        label: `${c.client} - ${c.name}`,
      })),
    ];
    setClientOptions(options);
    setSelectedOption(['ALL']);
    filterData(['ALL'], defaultFrom, defaultTo);
  }, []);

  const filterData = (clientIds, from, to) => {
    let filteredData = [];

    if (clientIds.includes('ALL')) {
      filteredData = Object.values(clientTransactionData).flat();
    } else {
      clientIds.forEach(cid => {
        filteredData.push(...(clientTransactionData[cid] || []));
      });
    }

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
    const clientIds = selectedOption.length > 0 ? selectedOption : ['ALL'];
    filterData(clientIds, fromDate, toDate);
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
                      const filtered = value.filter((v) => v !== 'ALL');
                      setSelectedOption(filtered);
                    }
                  }}
                  input={<OutlinedInput label="Select Client" />}
                  renderValue={(selected) =>
                    selected
                      .map(val => clientOptions.find(o => o.value === val)?.label || val)
                      .join(', ')
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
            <CCol md={8} className="d-flex justify-content-center gap-2">
              <CButton color="primary">Print</CButton>
              <CButton color="success" variant="outline" onClick={handlePreview}>
                Preview
              </CButton>
              <CButton color="danger" variant="ghost">Cancel</CButton>
            </CCol>
          </CRow>

          {/* Second Row - Date Inputs */}
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
