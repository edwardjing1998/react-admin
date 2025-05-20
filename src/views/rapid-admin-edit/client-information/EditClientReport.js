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

const EditClientReport = ({ selectedGroupRow }) => {

  const [tableData, setTableData] = useState([]);
  const [reportReceived, setReportReceived] = useState('');
  const [reportDestination, setReportDestination] = useState('');
  const [reportFileType, setReportFileType] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  
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
          : 'None', // 0 or any other case
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
    { field: 'reportName', headerName: 'Report Name', filter: true, width: 300 }, // ⬅️ wider
      /*{ Data Rows{
      field: 'receive',
      headerName: 'Receive',
      filter: true,
      width: 120, 
      cellRenderer: (params) => (
        <select
          value={params.value}
          onChange={(e) =>
            params.api.getRowNode(params.node.id).setDataValue('receive', e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
          style={cellSelectStyle}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      ),
    },
    {
      field: 'destination',
      headerName: 'Destination',
      filter: true,
      width: 120,
      cellRenderer: (params) => (
        <select
          value={params.value}
          onChange={(e) =>
            params.api.getRowNode(params.node.id).setDataValue('destination', e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
          style={cellSelectStyle}
        >
          <option value="0">None</option>
          <option value="1">File</option>
          <option value="2">Print</option>
        </select>
      ),
    },
    {
      field: 'fileText',
      headerName: 'File Type',
      filter: true,
      width: 120,
      cellRenderer: (params) => (
        <select
          value={params.value}
          onChange={(e) =>
            params.api.getRowNode(params.node.id).setDataValue('fileText', e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
          style={cellSelectStyle}
        >
          <option value="0">None</option>
          <option value="1">Text</option>
          <option value="2">Excel</option>
        </select>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      filter: true,
      width: 120,
      cellRenderer: (params) => (
        <select
          value={params.value}
          onChange={(e) =>
            params.api.getRowNode(params.node.id).setDataValue('email', e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
          style={cellSelectStyle}
        >
          <option value="Email">Email</option>
          <option value="Web">Web</option>
          <option value="None">None</option>
        </select>
      ),
    },
    {
      field: 'password',
      headerName: 'Password',
      filter: true,
      width: 120,
      cellRenderer: (params) => (
        <input
          type="password"
          value={params.value}
          onChange={(e) =>
            params.api.getRowNode(params.node.id).setDataValue('password', e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            fontSize: '12px',
            height: '30px',
            padding: '2px 4px',
            border: '1px solid gray',
            borderRadius: '4px',
          }}
        />
      ),
    },}*/
  ];

  const defaultColDef = {
    flex: 1,
    resizable: true,
    filter: true,
  };

  const handleRowClicked = (event) => {
    const row = event.data;
    localStorage.setItem('selectedClient', row.reportName);
    {/* Data Rows
    if (onRowClick) {
      onRowClick(row);
    } */}
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div
              className="ag-grid-container ag-theme-quartz"
              style={{ height: 400 }}
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
                    <MenuItem value="" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Select</MenuItem>
                    <MenuItem value="0" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Yes</MenuItem>
                    <MenuItem value="1" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>No</MenuItem>
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
                    <MenuItem value="" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Select</MenuItem>
                    <MenuItem value="0" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>File</MenuItem>
                    <MenuItem value="1" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Print</MenuItem>
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
                    <MenuItem value="" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Select</MenuItem>
                    <MenuItem value="0" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Text</MenuItem>
                    <MenuItem value="1" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Excel</MenuItem>
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
              <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                <InputLabel id="atm-cash-input-label" sx={{ fontSize: '0.78rem' }}>
                  ATM/Cash
                </InputLabel>
                <Select
                    labelId="atm-cash-label"
                    id="atm-cash-prefix"
                    label="ATM/Cash"
                    value=""

                    sx={{
                      '.MuiSelect-select': {
                        fontWeight: 300,
                        fontSize: '0.78rem',
                      }
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Select Rule</MenuItem>
                    <MenuItem value="0" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Destroy</MenuItem>
                    <MenuItem value="1" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Return</MenuItem>
                  </Select>
              </FormControl>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
};

export default EditClientReport;
