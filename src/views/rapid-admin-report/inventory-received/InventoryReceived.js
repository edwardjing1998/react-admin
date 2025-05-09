// File: InventoryReceived.js
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
import './InventoryReceived.scss';
import PreviewReport from './PreviewReport.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { exportToPdf } from '../../../utils/reports/exportToPdf.js';
import { exportPreviewReportPdf } from './exportPreviewReportPdf.js';

ModuleRegistry.registerModules([AllCommunityModule]);

const optionalCols = [
  { field: 'client', headerName: 'Client', show: true },
  { field: 'caseNumber', headerName: 'Case No', show: true },
  { field: 'account', headerName: 'Account', show: true },
  { field: 'lastName', headerName: 'Last Name', show: false },
  { field: 'firstName', headerName: 'First Name', show: false },
  { field: 'hmPhone', headerName: 'Home Phone', show: false },
  { field: 'wkPhone', headerName: 'Work Phone', show: false },
  { field: 'status', headerName: 'Status', show: false },
  { field: 'numCards', headerName: 'Num Cards', show: false },
  { field: 'nextDate', headerName: 'Next Date', show: false },
  { field: 'reason', headerName: 'Reason', show: false },
  { field: 'disposition', headerName: 'Disposition', show: true },
  { field: 'inDate', headerName: 'In Date', show: false },
  { field: 'deliveryId', headerName: 'Delivery ID', show: false },
  { field: 'sysPrin', headerName: 'Sys Prin', show: true },
  { field: 'outDate', headerName: 'Out Date', show: false },
  { field: 'cycle', headerName: 'Cycle', show: false },
  { field: 'active', headerName: 'Active', show: false },
  { field: 'inHour', headerName: 'In Hour', show: false },
  { field: 'autoDate', headerName: 'Auto Date', show: false },
  { field: 'subreason', headerName: 'Subreason', show: false },
];

const DailyReturnDestroyOptions = [
  { value: 'D', label: 'Destroyed' },
  { value: 'B', label: 'Returned' },
  { value: 'S', label: 'Special Destroy' },
  { value: 'R', label: 'Research' },
  { value: 'H', label: 'Hold' },
];

const InventoryReceived = () => {
  const [selectedOption, setSelectedOption] = useState(['ALL']);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientOptions, setClientOptions] = useState([]);
  const [clientsJson, setClientsJson] = useState([]);
  const [inventoryData, setInventoryData] = useState({});
  const [rowData, setRowData] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [selectedDispositions, setSelectedDispositions] = useState(['D', 'B', 'S', 'R', 'H']);
  const [showPreview, setShowPreview] = useState(false);

  const [colDefs, setColDefs] = useState(
    optionalCols.filter(col => col.show).map(col => ({
      ...col,
      valueFormatter: col.field === 'disposition'
        ? (params) => {
            const match = DailyReturnDestroyOptions.find(opt => opt.value === params.value);
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

    fetch('http://localhost:4444/api/client-search')
      .then(res => res.json())
      .then(data => {
        setClientsJson(data);
        const options = [
          { value: 'ALL', label: 'All Clients' },
          ...data.map(c => ({ value: c.client, label: `${c.client} - ${c.name}` })),
        ];
        setClientOptions(options);
      });

    fetch('http://localhost:4444/api/inventory-received')
      .then(res => res.json())
      .then(data => {
        setInventoryData(data);
        filterData(['ALL'], oneMonthAgo, today, ['D', 'B', 'S', 'R', 'H'], data);
      });
  }, []);

  const filterData = (clientIds, from, to, dispositions, dataSource = inventoryData) => {
    let filteredData = [];

    if (clientIds.includes('ALL')) {
      filteredData = Object.values(dataSource).flat();
    } else {
      clientIds.forEach(cid => {
        filteredData.push(...(dataSource[cid] || []));
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

      // Add rowId to each record
    const enriched = filteredData.map((item, index) => ({
      ...item,
      rowId: `row_${index}`,
    }));

    setRowData(enriched);
    return enriched;
  };

  const handlePreview = () => {
    const clientIds = selectedOption.length === 0 ? ['ALL'] : selectedOption;
    const dispositions = selectedDispositions.length === 0 ? ['D', 'B', 'S', 'R', 'H'] : selectedDispositions;

    if (selectedOption.length === 0) setSelectedOption(['ALL']);
    if (selectedDispositions.length === 0) setSelectedDispositions(['D', 'B', 'S', 'R', 'H']);

    const previewResults = filterData(clientIds, fromDate, toDate, dispositions);
    setPreviewData(previewResults);
    setShowPreview(true);
  };

  const handleSearch = () => {
    const clientIds = selectedOption.length === 0 ? ['ALL'] : selectedOption;
    const dispositions = selectedDispositions.length === 0 ? ['D', 'B', 'S', 'R', 'H'] : selectedDispositions;

    if (selectedOption.length === 0) setSelectedOption(['ALL']);
    if (selectedDispositions.length === 0) setSelectedDispositions(['D', 'B', 'S', 'R', 'H']);

    filterData(clientIds, fromDate, toDate, dispositions);
    setShowPreview(false);
  };

  const handleToggleColumn = (field, checked) => {
    const col = optionalCols.find(c => c.field === field);
    if (!col) return;

    const colWithFormatter = {
      ...col,
      valueFormatter: col.field === 'disposition'
        ? (params) => {
            const match = DailyReturnDestroyOptions.find(opt => opt.value === params.value);
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

  const handleExportPDF = () => {
    if (showPreview) {
      const groupedMap = {};
      previewData.forEach(({ client, sysPrin, disposition, numCards }) => {
        const fullDisposition = {
          D: 'Destroyed',
          B: 'Returned',
          S: 'Special Destroy',
          R: 'Research',
          H: 'Hold',
        }[disposition] || disposition;
  
        if (!groupedMap[client]) groupedMap[client] = {};
        if (!groupedMap[client][sysPrin]) groupedMap[client][sysPrin] = {};
        if (!groupedMap[client][sysPrin][fullDisposition]) {
          groupedMap[client][sysPrin][fullDisposition] = { count: 0, totalCards: 0 };
        }
  
        groupedMap[client][sysPrin][fullDisposition].count += 1;
        groupedMap[client][sysPrin][fullDisposition].totalCards += numCards || 0;
      });
  
      exportPreviewReportPdf({
        groupedMap,
        clients: clientsJson,
        fromDate,
        toDate,
      });
  
    } else {
      exportToPdf({
        filteredData: rowData,
        headers: ['Client', 'Case Number', 'Account', 'Disposition', 'Sys Prin'],
        fileName: 'inventory_received_report.pdf',
      });
    }
  };
  
  return (
    <div className="daily-activity-wrapper">
      <CCard>
        <CCardBody>
          {/* Inputs */}
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
            <CCol md={4} className="mt-3">
                <div className="d-flex flex-wrap justify-content-end gap-2">
                  <CButton color="dark" onClick={handleExportPDF}>
                    📄 Export to PDF
                  </CButton>

                  <CButton color="primary" onClick={() => window.print()}>
                    🖨️ Print
                  </CButton>

                  <CButton color="success" variant="outline" onClick={handlePreview}>
                    👁️ Preview
                  </CButton>
                </div>
              </CCol>

          </CRow>

          {/* Client, Disposition, Columns & Search (3-column layout) */}
          <CRow className="mb-5 align-items-center">
            {/* Client Selection */}
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

            {/* Disposition Selection */}
            <CCol md={4}  className="mb-3 mb-md-0">
              <FormControl fullWidth size="small">
                <InputLabel id="disposition-select-label">Disposition Type</InputLabel>
                <Select
                  labelId="disposition-select-label"
                  multiple
                  value={selectedDispositions}
                  onChange={(e) => setSelectedDispositions(e.target.value)}
                  input={<OutlinedInput label="Disposition Type" />}
                  renderValue={(selected) =>
                    selected.map(val => DailyReturnDestroyOptions.find(o => o.value === val)?.label || val).join(', ')
                  }
                >
                  {DailyReturnDestroyOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      <Checkbox checked={selectedDispositions.includes(opt.value)} />
                      <ListItemText primary={opt.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CCol>

            {/* Column Config & Search */}
            <CCol md={4} className="mt-3">
              <div className="d-flex justify-content-end align-items-center gap-2 flex-wrap">
                {/* Column Selector */}
                <CDropdown>
                  <CDropdownToggle color="warning" variant="outline">
                    ⚙️ Columns
                  </CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
                    {optionalCols.map((col) => (
                      <CDropdownItem key={col.field} as="div" className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id={col.field}
                          checked={colDefs.some((def) => def.field === col.field)}
                          onChange={(e) => handleToggleColumn(col.field, e.target.checked)}
                          className="me-2"
                        />
                        <label htmlFor={col.field}>{col.headerName}</label>
                      </CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>

                {/* Search Button */}
                <CButton color="info" onClick={handleSearch}>
                  🔍 Search
                </CButton>
              </div>
            </CCol>
          </CRow>


          {/* Grid or Preview */}
          <div className="ag-grid-container ag-theme-quartz mt-5" style={{ height: '600px' }}>
          {showPreview ? (
                <PreviewReport
                rawData={previewData}
                fromDate={fromDate}
                toDate={toDate}
                clients={clientsJson}  // ✅ Pass clientsJson to PreviewReport
              />
              ) : (
                <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true}                       
                paginationPageSize={10}
              />
              )}

          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default InventoryReceived;
