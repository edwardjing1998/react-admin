// File: ProductivityReport.js

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  CCard, CCardBody, CForm, CFormLabel, CFormInput, CFormSelect,
  CFormCheck, CRow, CCol, CButton
} from '@coreui/react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import './ProductivityReport.scss';

import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


ModuleRegistry.registerModules([AllCommunityModule]);

const ProductivityReport = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reportType, setReportType] = useState('daily');
  const [designOption, setDesignOption] = useState('');
  const [userId, setUserId] = useState('');
  const [bulkCardDestroys, setBulkCardDestroys] = useState(false);
  const [allData, setAllData] = useState([]);
  const [filteredRowData, setFilteredRowData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [userList, setUserList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const gridRef = useRef(null);
  const [modalSize, setModalSize] = useState('normal'); // normal | maximized | minimized

  useEffect(() => {
    fetch('http://localhost:4444/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        if (data.length > 0) {
          setDesignOption(data[0].userId.trim());
        }
      })
      .catch((error) => console.error('Failed to load users:', error));

    fetch('http://localhost:4444/api/productivity-work/all')
      .then((res) => res.json())
      .then((data) => setAllData(data))
      .catch((error) => console.error('Failed to load productivity data:', error));
  }, []);

  const handlePrint = () => {
    const trimmedDesignOption = designOption.trim().toLowerCase();
    
    if (trimmedDesignOption === 'all_users') {
      setFilteredRowData(allData);
    } else {
      const filtered = allData.filter(d => d.userId.trim().toLowerCase() === trimmedDesignOption);
      setFilteredRowData(filtered);
    }
  
    setShowGrid(true);
    setShowDialog(true);
  };
  

  const handleFirstDataRendered = (params) => {
    const allColumnIds = [];
    params.columnApi.getAllColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    params.columnApi.autoSizeColumns(allColumnIds);
  };

  const handleMinimize = () => {
    setModalSize((prev) => (prev === 'minimized' ? 'normal' : 'minimized'));
  };

  const handleMaximize = () => {
    setModalSize((prev) => (prev === 'maximized' ? 'normal' : 'maximized'));
  };

  const dialogStyle = useMemo(() => {
    if (modalSize === 'minimized') {
      return { width: 500, height: 60, position: 'absolute', bottom: 10, left: 10 };
    }
    if (modalSize === 'maximized') {
      return { 
        width: '100%', 
        height: '100%',
        margin: 0,
        top: 0,
        left: 0,
        transform: 'none',
        position: 'absolute'
      };
    }
    // Normal size: center manually
    return { 
      width: '90%', 
      height: '90%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',   // <-- center horizontally and vertically
      position: 'absolute'
    };
  }, [modalSize]);
  

 

  const handlePreview = async (userIdParam) => {
    const selected = userIdParam || designOption;
    const selectedId = selected.trim().toLowerCase();
  
    if (!fromDate || !toDate) {
      alert("Please select both From Date and To Date.");
      return;
    }
  
    let apiUrl = '';
  
    if (selectedId === 'all_users') {
      apiUrl = `http://localhost:4444/api/productivity-work/all-users?fromDate=${fromDate}T00:00:00&toDate=${toDate}T23:59:59`;
    } else {
      apiUrl = `http://localhost:4444/api/productivity-work/by-user?userId=${selectedId}&fromDate=${fromDate}T00:00:00&toDate=${toDate}T23:59:59`;
    }
  
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error(`Error fetching data: ${res.status}`);
      }
      const data = await res.json();
      setFilteredRowData(data);
      setShowGrid(true);
    } catch (error) {
      console.error('Failed to load filtered productivity data:', error);
      alert('Error loading report data.');
    }
  };
  
  const handleCancel = () => {
    setFromDate('');
    setToDate('');
    setReportType('daily');
    setDesignOption('');
    setUserId('');
    setBulkCardDestroys(false);
  };

  const handleCreatePdf = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a3',
    });
  
    const columns = [
      { header: 'User ID', dataKey: 'userId' },
      { header: 'User Name', dataKey: 'userName' },
      { header: 'From Date', dataKey: 'fromDate' },
      { header: 'To Date', dataKey: 'toDate' },
      { header: 'Mailed Count', dataKey: 'mailedCount' },
      { header: 'Returned Count', dataKey: 'returnedCount' },
      { header: 'Destroyed Count', dataKey: 'destroyedCount' },
      { header: 'Special Count', dataKey: 'specialCount' },
      { header: 'Hold Count', dataKey: 'holdCount' },
      { header: 'Research Count', dataKey: 'researchCount' },
      { header: 'Bulk Dest. Count', dataKey: 'bulkDestCount' },
      { header: 'Bulk Ret. Count', dataKey: 'bulkRetCount' },
      { header: 'Private Label Count', dataKey: 'privateLabelCount' },
      { header: 'Metal Card Count', dataKey: 'metalCardCount' },
      { header: 'Robot Label Total', dataKey: 'robotLabelTotal' },
    ];
  
    doc.setFontSize(14); // Set the title font size
    doc.text('Productivity Report', 40, 30);
  
    doc.autoTable({
      startY: 50,
      head: [columns.map(col => col.header)],
      body: filteredRowData.map(row => columns.map(col => row[col.dataKey])),
      styles: {
        fontSize: 9,              // <-- Set body font size smaller
        overflow: 'linebreak',    // Only line break inside cell content (not header)
        cellPadding: 4,
      },
      headStyles: {
        fontSize: 10,             // <-- Set header font size
        halign: 'center',         // Center header text horizontally
        valign: 'middle',         // Center header text vertically
        overflow: 'visible',      // <-- IMPORTANT: prevent header word wrap
        cellWidth: 'wrap',        // Header column auto-adjust
        fontStyle: 'bold',
        fillColor: [22, 160, 133], // Nice green-blue header background
        textColor: [255, 255, 255], // White text
      },
      margin: { left: 40, right: 40 },
      theme: 'grid',
      tableWidth: 'auto',
      didDrawPage: (data) => {
        doc.setFontSize(8);
        const pageCount = doc.internal.getNumberOfPages();
        doc.text(`Page ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
      },
    });
  
    doc.save('productivity_report.pdf');
  };
  
  const columnDefs = useMemo(() => [
    { field: 'userId', headerName: 'User ID', sortable: true, filter: true },
    { field: 'userName', headerName: 'User Name', sortable: true, filter: true },
    { field: 'fromDate', headerName: 'From Date', sortable: true, filter: true },
    { field: 'toDate', headerName: 'To Date', sortable: true, filter: true },
    { field: 'mailedCount', headerName: 'Mailed Count', sortable: true, filter: true },
    { field: 'returnedCount', headerName: 'Returned Count', sortable: true, filter: true },
    { field: 'destroyedCount', headerName: 'Destroyed Count', sortable: true, filter: true },
    { field: 'specialCount', headerName: 'Special Count', sortable: true, filter: true },
    { field: 'holdCount', headerName: 'Hold Count', sortable: true, filter: true },
    { field: 'researchCount', headerName: 'Research Count', sortable: true, filter: true },
    { field: 'bulkDestCount', headerName: 'Bulk Dest. Count', sortable: true, filter: true },
    { field: 'bulkRetCount', headerName: 'Bulk Ret. Count', sortable: true, filter: true },
    { field: 'privateLabelCount', headerName: 'Private Label Count', sortable: true, filter: true },
    { field: 'metalCardCount', headerName: 'Metal Card Count', sortable: true, filter: true },
    { field: 'robotLabelTotal', headerName: 'Robot Label Total', sortable: true, filter: true }
  ], []);

  return (
    <div className="productivity-report-wrapper">
      <CCard>
        <CCardBody>
          <h5 className="mb-4">Productivity Report Print</h5>

          <CForm>
            {/* Form inputs */}
            <CRow>
              <CCol md={6}>
                {/* Fields for fromDate, toDate, reportType, designOption, etc. */}
                <div className="mb-3">
                  <CFormLabel htmlFor="fromDate">From Date</CFormLabel>
                  <CFormInput type="date" id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="toDate">To Date</CFormLabel>
                  <CFormInput type="date" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
                <div className="mb-3">
                  <CFormLabel>Productivity Report</CFormLabel>
                  <CFormCheck inline type="radio" name="reportType" label="Daily" value="daily" checked={reportType === 'daily'} onChange={(e) => setReportType(e.target.value)} />
                  <CFormCheck inline type="radio" name="reportType" label="Summary - Multi Days" value="summary" checked={reportType === 'summary'} onChange={(e) => setReportType(e.target.value)} />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="designOption">User ID</CFormLabel>
                  <CFormSelect id="designOption" value={designOption} onChange={(e) => { setDesignOption(e.target.value); handlePreview(e.target.value); }}>
                    <option value="">-- Select User --</option>
                    <option value="ALL_USERS">All Users</option>
                    {userList.map((user) => (
                      <option key={user.userId} value={user.userId}>{user.userName.trim()} ({user.userId})</option>
                    ))}
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <CFormCheck type="checkbox" id="bulkCardDestroys" label="Bulk Card Destroys" checked={bulkCardDestroys} onChange={(e) => setBulkCardDestroys(e.target.checked)} />
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <CButton color="info" onClick={() => handlePreview()}>Preview</CButton>
                  <CButton color="primary" onClick={handlePrint}>Print</CButton>
                  <CButton color="secondary" onClick={handleCancel}>Cancel</CButton>
                </div>
              </CCol>
              <CCol md={6}></CCol>
            </CRow>

            {/* Main Grid */}
            <CRow className="mt-4">
              <CCol md={12}>
                {showGrid && filteredRowData.length > 0 ? (
                  <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
                    <AgGridReact
                      key={designOption}
                      rowData={filteredRowData}
                      columnDefs={columnDefs}
                      pagination={true}
                      paginationPageSize={10}
                      paginationPageSizeSelector={[10, 20, 50, 100]}
                      defaultColDef={{ flex: 1, minWidth: 100, resizable: true }}
                    />
                  </div>
                ) : (
                  <p className="text-center mt-3">No data available. Please select a user to view the report.</p>
                )}
              </CCol>
            </CRow>

            {/* Dialog with Grid inside */}
            <Dialog
                open={showDialog}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setShowDialog(false);
                    }
                }}
                maxWidth={false}
                scroll="none"
                PaperProps={{ sx: dialogStyle }}
                >

                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Productivity Report (Print View)</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Minimize and Close icons */}
                    <IconButton aria-label="minimize" size="small" onClick={handleMinimize}>
                    <RemoveIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="close" size="small" onClick={() => setShowDialog(false)}>
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                </Box>
                </DialogTitle>

                  {/* Create PDF Button BELOW Title */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', px: 3, mt: -1, mb: 1 }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="small" 
                        onClick={handleCreatePdf}
                        sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                    >
                        Create PDF
                    </Button>
                </Box>


                {modalSize !== 'minimized' && ( // ❗ only show grid when not minimized
                    <DialogContent dividers>
                    {showGrid && filteredRowData.length > 0 ? (
                        <div style={{ height: 500, width: '100%' }}>
                        <AgGridReact
                            key={designOption + "-print"}
                            rowData={filteredRowData}
                            columnDefs={columnDefs}
                            pagination={true}
                            paginationPageSize={10}
                            paginationPageSizeSelector={[10, 20, 50, 100]}
                            defaultColDef={{ resizable: true, wrapHeaderText: true, autoHeaderHeight: true }}
                            suppressColumnVirtualisation={true}
                            onGridReady={handleFirstDataRendered}
                        />
                        </div>
                    ) : (
                        <Typography align="center" sx={{ mt: 4 }}>No data available to print.</Typography>
                    )}
                    </DialogContent>
                )}

                </Dialog>


          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default ProductivityReport;
