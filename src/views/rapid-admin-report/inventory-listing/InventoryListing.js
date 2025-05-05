// File: DailyReturnDestroy.js
import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
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
import './InventoryListing.scss';
import { clientsJson, inventoryListing } from './data.js';

ModuleRegistry.registerModules([AllCommunityModule]);

const optionalCols = [
  { field: 'caseNumber', headerName: 'Case No', show: true },
  { field: 'account', headerName: 'Account', show: true },
  { field: 'lastName', headerName: 'Last Name', show: true },
  { field: 'firstName', headerName: 'First Name', show: true },
  { field: 'addr1', headerName: 'Address 1', show: true },
  { field: 'addr2', headerName: 'Address 2', show: true },
  { field: 'city', headerName: 'City', show: true },
  { field: 'state', headerName: 'State', show: true },
  { field: 'zip', headerName: 'Zip', show: false },
  { field: 'homePhone', headerName: 'Home Phone', show: false },
  { field: 'workPhone', headerName: 'Work Phone', show: false },
  { field: 'status', headerName: 'Status', show: false },
  { field: 'numCards', headerName: 'Num Cards', show: false },
  { field: 'nextDate', headerName: 'Next Date', show: false },
  { field: 'noRenewal', headerName: 'No Renewal', show: false },
  { field: 'reason', headerName: 'Reason', show: false },
  { field: 'disposition', headerName: 'Disposition', show: false },
  { field: 'inDate', headerName: 'In Date', show: false },
  { field: 'deliveryId', headerName: 'Delivery ID', show: false },
  { field: 'sysPrin', headerName: 'Sys Prin', show: false },
  { field: 'outDate', headerName: 'Out Date', show: false },
  { field: 'cycle', headerName: 'Cycle', show: false },
  { field: 'active', headerName: 'Active', show: false },
  { field: 'inHour', headerName: 'In Hour', show: false },
  { field: 'autoDate', headerName: 'Auto Date', show: false },
  { field: 'subreason', headerName: 'Subreason', show: false },
];

// ✅ Updated options
const InventoryOptions = [
  { value: 'R', label: 'Research' },
  { value: 'H', label: 'Hold' },
];

const InventoryListing = () => {
  const [selectedOption, setSelectedOption] = useState(['ALL']);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientOptions, setClientOptions] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [selectedDispositions, setSelectedDispositions] = useState(['R', 'H']);

  const [colDefs, setColDefs] = useState(
    optionalCols.filter(col => col.show).map(col => ({
      ...col,
      valueFormatter: col.field === 'disposition'
        ? (params) => {
            const match = InventoryOptions.find(opt => opt.value === params.value);
            return match ? `${match.value} - ${match.label}` : params.value;
          }
        : undefined,
    }))
  );

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

    const options = [
      { value: 'ALL', label: 'All Clients' },
      ...clientsJson.map(c => ({ value: c.client, label: `${c.client} - ${c.name}` })),
    ];
    setClientOptions(options);

    filterData(['ALL'], oneMonthAgo, today, ['R', 'H']);
  }, []);

  const filterData = (clientIds, from, to, dispositions) => {
    let filteredData = [];

    if (clientIds.includes('ALL')) {
      filteredData = Object.values(inventoryListing).flat();
    } else {
      clientIds.forEach(cid => {
        filteredData.push(...(inventoryListing[cid] || []));
      });
    }

    if (from && to) {
      const fromDateObj = new Date(from);
      const toDateObj = new Date(to);
      filteredData = filteredData.filter(item => {
        const inDate = item.inDate ? new Date(item.inDate) : null;
        return inDate && inDate >= fromDateObj && inDate <= toDateObj;
      });
    }

    if (dispositions.length > 0) {
      filteredData = filteredData.filter(item =>
        dispositions.includes(item.disposition)
      );
    }

    setRowData(filteredData);
  };

  const handlePreview = () => {
    const clientIds = selectedOption.length === 0 ? ['ALL'] : selectedOption;
    const dispositions = selectedDispositions.length === 0 ? ['R', 'H'] : selectedDispositions;

    if (selectedOption.length === 0) {
      setSelectedOption(['ALL']);
    }
    if (selectedDispositions.length === 0) {
      setSelectedDispositions(['R', 'H']);
    }

    filterData(clientIds, fromDate, toDate, dispositions);
  };

  const handleToggleColumn = (field, checked) => {
    const col = optionalCols.find(c => c.field === field);
    if (!col) return;

    const colWithFormatter = {
      ...col,
      valueFormatter: col.field === 'disposition'
        ? (params) => {
            const match = InventoryOptions.find(opt => opt.value === params.value);
            return match ? `${match.value} - ${match.label}` : params.value;
          }
        : undefined,
    };

    if (checked) {
      if (!colDefs.some(def => def.field === col.field)) {
        setColDefs(prev => [...prev, colWithFormatter]);
      }
    } else {
      setColDefs(prev => prev.filter(def => def.field !== col.field));
    }
  };

  return (
    <div className="daily-activity-wrapper">
      <CCard>
        <CCardBody>
          {/* Date Range */}
          <CRow className="mb-5 align-items-end">
            <CCol md={4} className="mb-3 mb-md-0 mt-3">
              <div className="d-flex align-items-center gap-2">
                <CFormLabel htmlFor="fromDate" className="mb-0">From</CFormLabel>
                <CFormInput
                  type="date"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
            </CCol>
            <CCol md={4} className="mb-3 mb-md-0 mt-3">
              <div className="d-flex align-items-center gap-2">
                <CFormLabel htmlFor="toDate" className="mb-0">To</CFormLabel>
                <CFormInput
                  type="date"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </CCol>
            <CCol md={4} className="d-flex justify-content-end gap-2 mt-3">
              <CDropdown>
                <CDropdownToggle color="warning" variant="outline">⚙️ Columns</CDropdownToggle>
                <CDropdownMenu style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
                  {optionalCols.map(col => (
                    <CDropdownItem key={col.field} as="div" className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        id={col.field}
                        checked={colDefs.some(def => def.field === col.field)}
                        onChange={(e) => handleToggleColumn(col.field, e.target.checked)}
                        className="me-2"
                      />
                      <label htmlFor={col.field}>{col.headerName}</label>
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
              <CButton color="primary">Print</CButton>
              <CButton color="success" variant="outline" onClick={handlePreview}>Preview</CButton>
            </CCol>
          </CRow>

          {/* Filters */}
          <CRow className="mb-5 align-items-center">
            <CCol md={6} className="mb-3 mb-md-0">
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
                      const filtered = value.filter(v => v !== 'ALL');
                      setSelectedOption(filtered);
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

            <CCol md={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="disposition-select-label">Inventory Type</InputLabel>
                <Select
                  labelId="disposition-select-label"
                  multiple
                  value={selectedDispositions}
                  onChange={(e) => setSelectedDispositions(e.target.value)}
                  input={<OutlinedInput label="Inventory Type" />}
                  renderValue={(selected) =>
                    selected.map(val => InventoryOptions.find(o => o.value === val)?.label || val).join(', ')
                  }
                >
                  {InventoryOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      <Checkbox checked={selectedDispositions.includes(opt.value)} />
                      <ListItemText primary={opt.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CCol>
          </CRow>

          {/* AG Grid Table */}
          <div className="ag-grid-container ag-theme-quartz mt-5" style={{ height: '600px' }}>
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

export default InventoryListing;
