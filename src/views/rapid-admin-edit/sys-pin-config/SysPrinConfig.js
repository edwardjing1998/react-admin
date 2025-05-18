import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody
} from '@coreui/react';

import ClientInformation from './ClientInformation.js';
import SysPrin from './SysPrin.js';
import ClientAutoComplete from '../client-search-input/ClientAutoCompleteInput.js'
import ClientInformationA from './ClientInformationA'
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import ClientAtmAndCashPrefixes from './ClientAtmAndCashPrefixes.js';
import ClientReports from './ClientReports.js';

import {
  REPORT_BREAK_OPTIONS,
  SEARCH_TYPE_OPTIONS
} from './field-value-mapping';



const SysPinConfig = () => {
  const [clientList, setClientList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const [inputValue, setInputValue] = useState('');
  const [isWildcardMode, setIsWildcardMode] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedGroupRow, setSelectedGroupRow] = useState(null);

  const handleClientsFetched = (fetchedClients) => {
    setCurrentPage(0);
    setClientList(prev => {
      const prevIds = prev.map(c => c.client).join(',');
      const newIds = fetchedClients.map(c => c.client).join(',');
      return prevIds === newIds ? prev : fetchedClients;
    });
  };

  const [selectedData, setSelectedData] = useState({
    client: '',
    name: '',
    address: '',
    billingSp: '',
    atmCashRule: '',
    sysPrinsPrefixes: [],
  });

  const sharedSx = {
    '& .MuiInputBase-root': {
      height: '20px',           // Set total height of the input box
      fontSize: '0.75rem',
    },
    '& .MuiInputBase-input': {
      padding: '4px 4px',       // Inner padding
      height: '30px',           // Force smaller height for input
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.75rem',
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
    setClientList([]); // ✅ Clear old page data
    fetch(`http://localhost:4444/api/clients-paging?page=${currentPage}&size=20`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch paged clients');
        }
        return response.json();
      })
      .then((data) => {
        setClientList(data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, [currentPage]);

  const handleCheckboxChange = (field) => (event) => {
    const checked = event.target.checked;
    setSelectedData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleRowClick = (rowData) => {
    const billingSp = rowData.billingSp || '';
    const matchedClient = clientList.find(client => client.billingSp === billingSp);
    const atmCashPrefixes = matchedClient?.sysPrinsPrefixes || [];
    const clientEmails = matchedClient?.clientEmail || [];
    const reportOptions = matchedClient?.reportOptions || [];
    const sysPrinsList = matchedClient?.sysPrins || [];

    const matchedSysPrin = sysPrinsList.find(sp =>
      sp?.id?.sysPrin === rowData.sysPrin || sp?.sysPrin === rowData.sysPrin
    );

    const specificInvalidDelivAreas = (matchedSysPrin?.invalidDelivAreas || []).map(area => ({
      ...area,
      sysPrin: matchedSysPrin?.id?.sysPrin || area.sysPrin,
    }));

    if (rowData.isGroup) {
      setSelectedGroupRow(rowData); // ✅ save the group row
      return; // optionally stop here if you don't want to overwrite selectedData
    }

    setSelectedData((prev) => ({
      ...prev,
      ...rowData,
      sysPrinsPrefixes: atmCashPrefixes,
      clientEmail: clientEmails,
      reportOptions: reportOptions,
      sysPrins: sysPrinsList,
      sysPrin: rowData.sysPrin || '',
      invalidDelivAreas: specificInvalidDelivAreas,
    }));
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '80vw', overflow: 'auto' }}>
     <CRow className="px-3" style={{ height: '100%', marginBottom: '10px' }}>
        {/* Left Panel (30%) */}
        <CCol style={{ flex: '0 0 29%', maxWidth: '29%', paddingLeft: '0px' }}>
            <ClientAutoComplete
              inputValue={inputValue}
              setInputValue={setInputValue}
              onClientsFetched={handleClientsFetched}
              isWildcardMode={isWildcardMode}
              setIsWildcardMode={setIsWildcardMode}
            />
        </CCol>

        {/* Right Panel (70%) */}
        <CCol style={{ flex: '0 0 71%', maxWidth: '71%' }}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ padding: 0 }}>
              <CRow style={{ height: '30px' }}>
                {/* Left Column */}
                <CCol style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  
                    <p style={{ margin: 0 }}>
                      {selectedGroupRow
                        ? `Selected Group: ${selectedGroupRow.client} - ${selectedGroupRow.name || ''}`
                        : 'No Client Found'}
                    </p>

                </CCol>

                {/* Right Column */}
                <CCol style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <p style={{ margin: 0 }}>This is the right column (50%).</p>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow style={{ height: '100%', marginBottom: '10px', paddingLeft: '0px', paddingRight: '12px' }}>
        <CCol style={{ flex: '0 0 30%', maxWidth: '30%' }}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ height: '100%', padding: 0 }}>
              <div style={{ height: '950px', overflow: 'hidden' }}>
                  <ClientInformation
                    onRowClick={handleRowClick}
                    clientList={clientList}
                    setClientList={setClientList} 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isWildcardMode={isWildcardMode}
                    setIsWildcardMode={setIsWildcardMode}
                    onFetchWildcardPage={(page) => {
                      const keyword = inputValue;
                      fetch(`http://localhost:4444/api/client/wildcard?keyword=${encodeURIComponent(keyword)}`)
                        .then((res) => res.json())
                        .then((newData) => {
                          setClientList(newData);
                          setCurrentPage(page);
                        });
                    }}                  
                  />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol style={{ flex: '0 0 70%', maxWidth: '70%' }}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ height: '100%', padding: 0 }}>
              <div style={{ height: '700px', overflow: 'auto' }}>
                <CRow className="p-3" style={{ height: '700px' }}>
                 <CCol style={{ flex: '0 0 60%', maxWidth: '60%', height: '100%' }}>

                    <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '-6px' }}>
                      <CCardBody
                        className="d-flex align-items-center"
                        style={{ padding: '0.25rem 0.5rem', height: '100%' }}
                      >
                        <span style={{ fontSize: '0.85rem' }}>Header or Toolbar Section</span>
                      </CCardBody>
                    </CCard>

                    <CCard style={{ height: '50px', marginBottom: '4px', marginTop: '10px' }}>
                      <CCardBody
                        style={{
                          padding: '0.25rem 0.5rem',
                          height: '100%',
                          backgroundColor: 'white',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        {/* Row 1 */}
                        <CRow style={{ height: '25px' }}>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ margin: 0, fontSize: '0.78rem' }}>Billing Sys/Prin</p>
                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ margin: 0, fontSize: '0.78rem' }}>Report Breaks</p>
                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ margin: 0, fontSize: '0.78rem' }}>Search Type</p>
                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ margin: 0, fontSize: '0.78rem' }}>Memo Type</p>
                          </CCol>
                        </CRow>

                        {/* Row 2 */}
                        <CRow style={{ height: '25px' }}>
                          <CCol style={{ display: 'flex', alignItems: 'center'}}>
                            
                            <TextField
                              placeholder="0"
                              value={selectedGroupRow?.billingSp || ''}
                              size="small"
                              fullWidth
                              disabled={!isEditable}
                              sx={sharedSx}
                            />

                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                            
                          <TextField
                              placeholder="xxx"
                              value={
                                REPORT_BREAK_OPTIONS.find(
                                  opt => opt.value === String(selectedGroupRow?.reportBreakFlag ?? '')
                                )?.label || ''
                              }
                              size="small"
                              fullWidth
                              disabled={!isEditable}
                              sx={sharedSx}
                            />

                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                            
                          <TextField
                              placeholder="xxx"
                              value={
                                SEARCH_TYPE_OPTIONS.find(
                                  opt => opt.value === String(selectedGroupRow?.chLookUpType ?? '')
                                )?.label || ''
                              }
                              size="small"
                              fullWidth
                              disabled={!isEditable}
                              sx={sharedSx}
                            />

                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                            
                          <TextField
                              placeholder="xxx"
                              value={selectedGroupRow?.memoType || ''}
                              size="small"
                              fullWidth
                              disabled={!isEditable}
                              sx={sharedSx}
                            />

                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>

                    <CCard style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <CCardBody
                        style={{
                          padding: '0.8rem',
                          backgroundColor: 'white',
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: '0px'
                        }}
                      >
                        {/* Row 1 */}
                        <CRow style={{ height: '25px' }}>
                        <CCol style={{  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',  paddingLeft: '4px', flex:'0 0 40%', maxWidth: '40%' }}>
                              {/* Checkboxes */}
                              <FormControlLabel
                                control={<Checkbox size="small" checked={!!selectedData.active} onChange={handleCheckboxChange('active')} disabled={!isEditable} />}
                                label="Client Active"
                                sx={{
                                  backgroundColor: 'white',
                                  pl: 1,
                                  m: 0,
                                  '& .MuiFormControlLabel-label': { fontSize: '0.78rem', color: 'black' },
                                  '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
                                }}
                              />
                          </CCol>
                          <CCol style={{  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',  paddingLeft: '4px', flex:'0 0 60%', maxWidth: '60%' }}>
                              {/* Checkboxes */}
                              <FormControlLabel
                                control={<Checkbox size="small" checked={!!selectedData.active} onChange={handleCheckboxChange('active')} disabled={!isEditable} />}
                                label="Positive Reporting"
                                sx={{
                                  backgroundColor: 'white',
                                  pl: 1,
                                  m: 0,
                                  '& .MuiFormControlLabel-label': { fontSize: '0.78rem', color: 'black' },
                                  '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
                                }}
                              />
                          </CCol>
                        </CRow>

                        {/* Row 2 */}
                        <CRow style={{ height: '25px' }}>
                        <CCol style={{  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',  paddingLeft: '4px', flex:'0 0 40%', maxWidth: '40%' }}>
                               {/* Checkboxes */}
                               <FormControlLabel
                                control={<Checkbox size="small" checked={!!selectedData.active} onChange={handleCheckboxChange('active')} disabled={!isEditable} />}
                                label="Sub Client"
                                sx={{
                                  backgroundColor: 'white',
                                  pl: 1,
                                  m: 0,
                                  '& .MuiFormControlLabel-label': { fontSize: '0.78rem', color: 'black' },
                                  '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
                                }}
                              />
                          </CCol>
                          <CCol style={{  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',  paddingLeft: '4px', flex:'0 0 60%', maxWidth: '60%' }}>
                             <FormControlLabel
                                control={<Checkbox size="small" checked={!!selectedData.active} onChange={handleCheckboxChange('active')} disabled={!isEditable} />}
                                label="Exclude From Postage Reports"
                                sx={{
                                  backgroundColor: 'white',
                                  pl: 1,
                                  m: 0,
                                  '& .MuiFormControlLabel-label': { fontSize: '0.78rem', color: 'black' },
                                  '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
                                }}
                              />
                          </CCol>
                        </CRow>

                        {/* Row 3 */}
                        <CRow style={{ height: '25px' }}>
                        <CCol style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '4px' }}>
                             <FormControlLabel
                                control={<Checkbox size="small" checked={!!selectedData.active} onChange={handleCheckboxChange('active')} disabled={!isEditable} />}
                                label="Check Here: If American Express Issued"
                                sx={{
                                  backgroundColor: 'white',
                                  pl: 1,
                                  m: 0,
                                  '& .MuiFormControlLabel-label': { fontSize: '0.78rem', color: 'black' },
                                  '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
                                }}
                              />
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>

                    <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '10px' }}>
                      <CCardBody
                        className="d-flex align-items-center"
                        style={{ padding: '0.25rem 0.5rem', height: '100%' }}
                      >
                        <span style={{ fontSize: '0.85rem' }}>ATM Cash Prefixes</span>
                      </CCardBody>
                    </CCard>

                    <CCard style={{ height: '150px', marginBottom: '4px', marginTop: '10px' }}>
                      <CCardBody
                        className="d-flex align-items-center"
                        style={{ padding: '0.25rem 0.5rem', height: '100%' }}
                      >
                        <div style={{ width: '100%', height: '100%' }}>
                          <ClientAtmAndCashPrefixes />
                        </div>
                      </CCardBody>
                    </CCard>

                    <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '10px' }}>
                      <CCardBody
                        className="d-flex align-items-center"
                        style={{ padding: '0.25rem 0.5rem', height: '100%' }}
                      >
                        <span style={{ fontSize: '0.85rem' }}>Client Reports</span>
                      </CCardBody>
                    </CCard>

                    <CCard style={{ height: '150px', marginBottom: '4px', marginTop: '10px' }}>
                      <CCardBody
                        className="d-flex align-items-center"
                        style={{ padding: '0.25rem 0.5rem', height: '100%' }}
                      >
                        <div style={{ width: '100%', height: '100%' }}>
                          <ClientReports />
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Left Panel (30%)
      <CRow className="mb-3">
        <CCol xs={12}>
            <CCard className="h-100">
            <CCardBody className="h-100 p-3">
                <div style={{ height: '100%', backgroundColor: '#f5f5f5' }}></div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow style={{ height: '55%' }}>
        <CCol xs={12}>
          <CCard className="h-100">
            <CCardBody className="h-100 p-3">
              <SysPrin selectedData={selectedData} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </div>
  );
};

export default SysPinConfig;
