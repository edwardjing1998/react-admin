// File: ClientInformationPanel.js
import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs
} from '@coreui/react';

import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { useClientContext } from '../../../context/ClientContext.js';


import ClientSearchInput from './ClientSearchInput';
import ClientInformationA from './ClientInformationA';
import ClientInformation from './ClientInformation.js';
import ClientInformationContent from './ClientInformationContent.js';
import ClientATMCashPrefixes from './ClientATMCashPrefixes.js';
import ClientReport from './ClientReport.js';
import ClientEmailSetup from './ClientEmailSetup.js';
import ClientEmailSetups from './ClientEmailSetups.js';
import ClientAtmCashPrefix from './ClientAtmCashPrefix.js';
import ClientInformationB from './ClientInformationB.js';

import useMediaQuery from '@mui/material/useMediaQuery';

const ClientInformationPanel = () => {
  const [sampleClients, setSampleClients] = useState([]);
  const { clientList } = useClientContext();
  
  const [selectedData, setSelectedData] = useState({
    client: '',
    name: '',
    addr: '',
    city: '',
    state: '',
    zip: '',
    contact: '',
    phone: '',
    active: false,
    faxNumber: '',
    billingSp: '',
    reportBreakFlag: '',      // dropdown 1
    chLookUpType: '',         // dropdown 2
    excludeFromReport: false,
    positiveReports: false,   // checkbox 2
    subClientInd: false,      // checkbox 3
    subClientXref: '',
    amexIssued: false,        // checkbox 4
    sysPrinsPrefixes: [],
    reportOptions: [],
    clientEmail: [],
  });
  
  const handleNewClientClick = async () => {
    try {
      const response = await fetch('http://localhost:4444/api/client/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedData),
      });

      if (!response.ok) throw new Error('Failed to save client data');

      const result = await response.json();
      console.log('✅ Client saved successfully:', result);
      alert('✅ Client saved successfully!');
    } catch (error) {
      console.error('❌ Error saving client:', error);
      alert('❌ Error saving client.');
    }
  };

  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const isSmallScreen = useMediaQuery('(max-width: 1024px)');

  const handleDeleteClick = () => {
    alert('Delete button clicked');
  };

  const [isEditable, setIsEditable] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');


  const handleClearClick = () => {
    setSelectedData({
      client: '',
      name: '',
      addr: '',
      city: '',
      state: '',
      zip: '',
      contact: '',
      phone: '',
      active: false,
      faxNumber: '',
      billingSp: '',
      reportBreakFlag: '',
      chLookUpType: '',
      excludeFromReport: false,
      positiveReports: false,
      subClientInd: false,
      subClientXref: '',
      amexIssued: false,
      sysPrinsPrefixes: [],
      reportOptions: [],
      clientEmail: [],
    });
    setIsEditable(true);  // 🟢 Allow editing
    setInput('');         // 🧹 Clear search input
    setSuggestions([]);   // 🔍 Clear suggestion list
    setIsEditable(true);  // 🟢 Make form editable
    setIsEditable(true);     // Enable form editing
    setSelectedEmail('');    // ✅ Clear the selected email field
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length === 0) {
      setSuggestions([]);
      return;
    }

    const filtered = sampleClients.filter((email) =>
      email.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelect = (label) => {
    setInput(label);
    setSuggestions([]);

    const matched = clientList.find(c => `${c.client} ${c.name}` === label);
    if (matched) {
      setSelectedData(matched);
      setIsEditable(false);
    }
  };

  useEffect(() => {
    if (clientList && clientList.length > 0) {
      const combined = clientList.map((c) => `${c.client} ${c.name}`);
      setSampleClients(combined);
    }
  }, [clientList]);

  const handleRowClick = (rowData) => {
    const billingSp = rowData.billingSp || '';
    const matchedClient = clientList.find(client => client.billingSp === billingSp);
    const atmCashPrefixes = matchedClient?.sysPrinsPrefixes || [];
    const clientEmails = matchedClient?.clientEmail || [];
    const reportOptions = matchedClient?.reportOptions || [];

    setSelectedData((prev) => ({
      ...prev,
      ...rowData,
      sysPrinsPrefixes: atmCashPrefixes,
      clientEmail: clientEmails,
      sysPrins: [],
      reportOptions: reportOptions,
    }));
  };

  return (
    <>
      {isSmallScreen ? (
        <>
          <CRow className="mb-3">
          <div style={{ backgroundColor: '#007bff', padding: '12px', borderRadius: '6px' }}>
            <CCol xs={12}>
              <ClientSearchInput
                input={input}
                handleChange={handleChange}
                suggestions={suggestions}
                handleSelect={handleSelect}
              />
            </CCol>
          </div>  
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
            <ClientInformationA selectedData={selectedData} isEditable={isEditable} setSelectedData={setSelectedData} />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12}>
               <ClientInformationB selectedData={selectedData} isEditable={isEditable} setSelectedData={setSelectedData} />
              {/* Footer Buttons */}
                <hr style={{ border: 'none', borderTop: '1px solid black', marginTop: '12px', marginBottom: '2px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <button
                    onClick={handleClearClick}
                    style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', marginRight: '16px' }}
                  >
                    <ClearIcon style={{ fontSize: '35px', color: 'gray' }} />
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', marginRight: '16px' }}
                  >
                    <DeleteIcon style={{ fontSize: '35px', color: 'gray' }} />
                  </button>
                  <button
                    onClick={handleNewClientClick}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    New Client
                  </button>
                </Box>
            </CCol>
          </CRow>
        </>
      ) : (
        <>
          <CRow className="mb-3" style={{ backgroundColor: '#007bff', padding: '6px 0', borderRadius: '6px' }}>
            <CCol xs={3}></CCol>
            <CCol xs={6} className="d-flex justify-content-end">
              <ClientSearchInput
                input={input}
                handleChange={handleChange}
                suggestions={suggestions}
                handleSelect={handleSelect}
              />
            </CCol>
            <CCol xs={3}></CCol>
          </CRow>

          <CRow className="mb-3 g-3" style={{ backgroundColor: '#f8f9fa' }}>
            <CCol xs={3}>
              <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px', height: '460px' }}>
              <ClientInformationA selectedData={selectedData} isEditable={isEditable} setSelectedData={setSelectedData} />
              </div>
            </CCol>

            <CCol xs={6}>
              <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px' }}>
                 <ClientEmailSetups handleDeleteClick={handleDeleteClick} clientEmails={selectedData.clientEmail} selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail}/>
              </div>
              <CCol xs={12}>
                <div style={{ minHeight: '40px', backgroundColor: 'white', borderRadius: '6px' }}></div>
              </CCol>
            </CCol>

            <CCol xs={3}>
              <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px' }}>
              <ClientAtmCashPrefix
                handleDeleteClick={handleDeleteClick}
                sysPrinsPrefixes={selectedData.sysPrinsPrefixes}
                />            
              </div>
              <CCol xs={12}>
                <div style={{ minHeight: '45px', backgroundColor: 'white', borderRadius: '6px' }}></div>
              </CCol>
            </CCol>
          </CRow>

          <CRow className="mt-3">
            <CCol xs={3} style={{ paddingRight: '8px' }}>
              <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px' }}>
                 <ClientInformationB selectedData={selectedData} isEditable={isEditable} setSelectedData={setSelectedData} />
                {/* Footer Buttons */}
                <hr style={{ border: 'none', borderTop: '1px solid black', marginTop: '12px', marginBottom: '2px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <button
                    onClick={handleClearClick}
                    style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', marginRight: '16px' }}
                  >
                    <ClearIcon style={{ fontSize: '35px', color: 'gray' }} />
                  </button>
                  
                  <button
                    onClick={handleDeleteClick}
                    style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', marginRight: '16px' }}
                  >
                    <DeleteIcon style={{ fontSize: '35px', color: 'gray' }} />
                  </button>
                  <button
                    onClick={handleNewClientClick}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    New Client
                  </button>
                </Box>
              </div>
            </CCol>

            <CCol xs={9} style={{ paddingLeft: '8px' }}>
              <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold' }}>
                <ClientReport selectedData={selectedData} />
              </div>
            </CCol>
          </CRow>

          <CRow style={{ minHeight: '20px' }} />
          <CRow className="g-3">
            <CCol xs={12}>
              <CCard>
                <CCardBody style={{ height: '450px' }}>
                  <ClientInformation onRowClick={handleRowClick} clientList={clientList} />
                </CCardBody>
              </CCard>
            </CCol>

            <CCol xs={12}>
              <CCard>
                <CCardBody>
                  <CTabs activeItemKey="clientInformation">
                    <CTabList variant="pills">
                      <CTab itemKey="clientInformation">Client Information</CTab>
                      <CTab itemKey="clientATMCashPrefixes"></CTab>
                      <CTab itemKey="clientEmailSetup">Client Email Setup</CTab>
                      <CTab itemKey="clientReports">Client Reports</CTab>
                    </CTabList>
                    <CTabContent>
                      <CTabPanel className="p-3" itemKey="clientInformation">
                        <ClientInformationContent selectedData={selectedData} />
                      </CTabPanel>
                      <CTabPanel className="p-3" itemKey="clientATMCashPrefixes">
                        <ClientATMCashPrefixes selectedData={selectedData} />
                      </CTabPanel>
                      <CTabPanel className="p-3" itemKey="clientEmailSetup">
                        <ClientEmailSetup selectedData={selectedData} />
                      </CTabPanel>
                      <CTabPanel className="p-3" itemKey="clientReports">
                        <ClientReport selectedData={selectedData} />
                      </CTabPanel>
                    </CTabContent>
                  </CTabs>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}
    </>
  );
};

export default ClientInformationPanel;
