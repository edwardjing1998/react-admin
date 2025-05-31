import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react';

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import '../../../scss/sys-prin-configuration/client-information.scss';

ModuleRegistry.registerModules([AllCommunityModule]);

const EditClientReport = ({ selectedGroupRow, isEditable }) => {

  const [tableData, setTableData] = useState([]);
  const [reportReceived, setReportReceived] = useState('');
  const [reportDestination, setReportDestination] = useState('');
  const [reportFileType, setReportFileType] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [reportName, setReportName] = useState('');

  const sharedSx = {
    '& .MuiInputBase-root': {
      height: '30px',           
      fontSize: '0.78rem',
    },
    '& .MuiInputBase-input': {
      padding: '4px 4px',       
      height: '30px',           
      fontSize: '0.78rem',
      lineHeight: '1rem',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.78rem',
      lineHeight: '1rem',
    },
    '& .MuiInputBase-input.Mui-disabled': {
      color: 'black',
      WebkitTextFillColor: 'black',
    },
    '& .MuiInputLabel-root.Mui-disabled': {
      color: 'black',
    },
  };

  useEffect(() => {
    if (!Array.isArray(selectedGroupRow?.reportOptions)) {
      setTableData([]);
      return;
    }

    console.log('✅ selectedGroupRow.reportOptions:', selectedGroupRow.reportOptions);
    const clientData = selectedGroupRow.reportOptions.map((option) => ({
      
      reportName: option?.reportDetails?.queryName || '',
      receive: option.receiveFlag ? 'Yes' : 'No',
      destination: option.outputTypeCd !== undefined && option.outputTypeCd !== null ? String(option.outputTypeCd) : '',
      fileText: option.fileTypeCd !== undefined && option.fileTypeCd !== null ? String(option.fileTypeCd) : '',
      email:
        option.emailFlag === 1
          ? 'Email'
          : option.emailFlag === 2
          ? 'Web'
          : 'None', 
      password: option.reportPasswordTx || '',
    }));
    
    setTableData(clientData);
  }, [selectedGroupRow]);

  const cellSelectStyle = {
    width: '100%',
    border: '1px solid gray',
    borderRadius: '4px',
    height: '28px',
  };

const columnDefs = [
    { field: 'reportName', headerName: 'Report Name', filter: true, width: 300 },
  ];

  const defaultColDef = {
    flex: 1,
    resizable: true,
    filter: true,
  };

  const handleRowClicked = (event) => {
    const row = event.data;
    setReportName(row.reportName);
    setReportReceived(row.receive === 'Yes' ? '0' : '1');
    setReportDestination(row.destination);
    setReportFileType(row.fileText);
    setPasswordValue(row.password);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div
              className="ag-grid-container ag-theme-quartz"
              style={{ height: 300 }}
            >
              <AgGridReact
                rowData={tableData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={false}
                paginationPageSize={20}
                onRowClicked={handleRowClicked}
              />
            </div>
          </CCardBody>
        </CCard>

        <CRow className="mb-3" style={{ height: '40px' }}>
          <CCol xs={12}>
             <TextField
                label="Report Name"
                onChange={(e) => setReportName(e.target.value)}
                value={reportName}
                size="small"
                fullWidth
                disabled={!isEditable}
                sx={sharedSx}
              />
          </CCol>
        </CRow>
        <CRow className="mb-3" style={{ height: '40px' }}>
          <CCol xs={6}>
          <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                <InputLabel id="received-label" sx={{ fontSize: '0.78rem' }}>
                  Received
                </InputLabel>
                <Select
                    labelId="received-label"
                    id="report-received"
                    label="Received"
                    value={reportReceived}
                    onChange={(e) => setReportReceived(e.target.value)}
                    sx={{
                      '.MuiSelect-select': {
                        fontWeight: 300,
                        fontSize: '0.78rem',
                      }
                    }}
                  >
                    <MenuItem value="0" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>None</MenuItem>
                    <MenuItem value="1" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Yes</MenuItem>
                    <MenuItem value="2" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>No</MenuItem>
                  </Select>
              </FormControl>
          </CCol>
          <CCol xs={6}>
              <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                <InputLabel id="report-destination-label" sx={{ fontSize: '0.78rem' }}>
                  Destination
                </InputLabel>
                <Select
                    labelId="report-destination-label"
                    id="report-destination"
                    label="Destination"
                    value={reportDestination}
                    onChange={(e) => setReportDestination(e.target.value)}
                    sx={{
                      '.MuiSelect-select': {
                        fontWeight: 300,
                        fontSize: '0.78rem',
                      }
                    }}
                  >
                    <MenuItem value="0" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>None</MenuItem>
                    <MenuItem value="1" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>File</MenuItem>
                    <MenuItem value="2" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Print</MenuItem>
                  </Select>
              </FormControl>
          </CCol>
        </CRow>
        <CRow className="mb-3" style={{ height: '40px' }}>
          <CCol xs={6}>
          <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                <InputLabel id="report-file-type-label" sx={{ fontSize: '0.78rem' }}>
                  File Type
                </InputLabel>
                <Select
                    labelId="report-file-type-label"
                    id="report-file-type"
                    label="File Type"
                    value={reportFileType}
                    onChange={(e) => setReportFileType(e.target.value)}

                    sx={{
                      '.MuiSelect-select': {
                        fontWeight: 300,
                        fontSize: '0.78rem',
                      }
                    }}
                  >
                    <MenuItem value="0" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>None</MenuItem>
                    <MenuItem value="1" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Text</MenuItem>
                    <MenuItem value="2" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Excel</MenuItem>
                  </Select>
              </FormControl>
          </CCol>
          <CCol xs={6}>
              <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                <InputLabel id="report-email-label" sx={{ fontSize: '0.78rem' }}>
                    Email
                </InputLabel>
                <Select
                    labelId="report-email-label"
                    id="report-email"
                    label="Email"
                    value=""

                    sx={{
                      '.MuiSelect-select': {
                        fontWeight: 300,
                        fontSize: '0.78rem',
                      }
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Select</MenuItem>
                    <MenuItem value="0" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Email</MenuItem>
                    <MenuItem value="1" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Web</MenuItem>
                  </Select>
              </FormControl>
          </CCol>
        </CRow>
        <CRow className="mb-3" style={{ height: '40px' }}>
          <CCol xs={6}>
              <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  sx={{
                    backgroundColor: 'white',
                    mb: 2,
                    '& .MuiInputBase-input': {
                      fontSize: '0.75rem',
                      fontWeight: 300,
                    }
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: '0.78rem',
                      fontWeight: 300,
                    }
                  }}
                />

          </CCol>
          <CCol xs={6}>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
};

export default EditClientReport;
