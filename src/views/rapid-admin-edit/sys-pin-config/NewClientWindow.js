import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CRow, CCol } from '@coreui/react';
import ClientInformationA from '../client-information/ClientInformationA'
import ClientInformationB from '../client-information/ClientInformationB'


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
        <Tab label="General" sx={{ fontSize: '0.75rem' }} />
        <Tab label="Sys/Prin" sx={{ fontSize: '0.75rem' }} />
        <Tab label="Reports" sx={{ fontSize: '0.75rem' }} />
        <Tab label="ATM Prefixes" sx={{ fontSize: '0.75rem' }} />
      </Tabs>

      <Box>
        {tabIndex === 0 && (
          <CRow className="mb-2" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', height: '620px' }}>
            <CCol xs={6} style={{ borderRight: '1px solid #ccc', height: '600px' }}>
              <div style={{ fontSize: '0.78rem', height: '600px' }}>
                <ClientInformationA selectedGroupRow={selectedGroupRow} isEditable={isEditable} setSelectedGroupRow={setSelectedGroupRow} />
              </div>
            </CCol>
            <CCol xs={6} style={{ height: '100%' }}>
                <ClientInformationB selectedGroupRow={selectedGroupRow} isEditable={isEditable} setSelectedGroupRow={setSelectedGroupRow} />
            </CCol>
          </CRow>
        )}
        {tabIndex === 1 && (
          <Box>
            <span style={{ fontSize: '0.8rem' }}>Sys/Prin tab content here...</span>
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <span style={{ fontSize: '0.8rem' }}>Reports tab content here...</span>
          </Box>
        )}
        {tabIndex === 3 && (
          <Box>
            <span style={{ fontSize: '0.8rem' }}>ATM Prefixes tab content here...</span>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewClientWindow;
