import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tabs, Tab, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CRow, CCol } from '@coreui/react';
import ClientInformationA from '../client-information/ClientInformationA';
import ClientInformationB from '../client-information/ClientInformationB';
import EditAtmCashPrefix from '../client-information/EditAtmCashPrefix';
import EditClientReport from '../client-information/EditClientReport'
import ClientEmailSetup from '../client-information/ClientEmailSetup'

const NewClientWindow = ({ onClose, selectedGroupRow, setSelectedGroupRow }) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isEditable, setIsEditable] = useState(true);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ padding: '16px', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>New Client</span>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" sx={{ mt: 1, mb: 2 }}>
        <Tab label="General" sx={{ fontSize: '0.78rem', textTransform: 'none',minWidth: 80, maxWidth: 80 }} />
        <Tab label="Email Setup" sx={{ fontSize: '0.78rem', textTransform: 'none', minWidth: 120, maxWidth: 120 }} />
        <Tab label="Reports" sx={{ fontSize: '0.78rem', textTransform: 'none', minWidth: 80, maxWidth: 80 }} />
        <Tab label="ATM Cash Prefixes" sx={{ fontSize: '0.78rem', textTransform: 'none', minWidth: 160, maxWidth: 160 }} />
      </Tabs>

      <Box>
        {tabIndex === 0 && (
          <>
            <CRow className="mb-2" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', height: '520px' }}>
              <CCol style={{ flex: '0 0 45%', maxWidth: '45%', borderRight: '1px solid #ccc', height: '420px' }}>
                <div style={{ fontSize: '0.78rem', height: '420px', paddingTop: '12px' }}>
                  <ClientInformationA selectedGroupRow={selectedGroupRow} isEditable={isEditable} setSelectedGroupRow={setSelectedGroupRow} />
                </div>
              </CCol>
              <CCol style={{ flex: '0 0 55%', maxWidth: '55%', height: '420px', paddingTop: '12px' }}>
                <ClientInformationB selectedGroupRow={selectedGroupRow} isEditable={isEditable} setSelectedGroupRow={setSelectedGroupRow} />
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button variant="outlined" size="small">Back</Button>
              </CCol>
              <CCol style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="contained" size="small">Save</Button>
                <Button variant="outlined" size="small">Next</Button>
              </CCol>
            </CRow>
          </>
        )}
        {tabIndex === 1 && (
          <Box>
            <ClientEmailSetup selectedGroupRow={selectedGroupRow} />
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <EditClientReport  selectedGroupRow={selectedGroupRow} />
          </Box>
        )}
        {tabIndex === 3 && (
          <Box>
             <EditAtmCashPrefix  sysPrinsPrefixes={selectedGroupRow.sysPrinsPrefixes} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewClientWindow;
