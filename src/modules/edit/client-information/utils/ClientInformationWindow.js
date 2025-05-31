import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tabs, Tab, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CRow, CCol } from '@coreui/react';
import EditClientInformationA from '../EditClientInformationA';
import EditClientInformationB from '../EditClientInformationB';
import EditAtmCashPrefix from '../EditAtmCashPrefix';
import EditClientReport from '../EditClientReport'
import EditClientEmailSetup from '../EditClientEmailSetup'

const ClientInformationWindow = ({ onClose, selectedGroupRow, setSelectedGroupRow, mode }) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isEditable, setIsEditable] = useState(true);

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:4444/api/client/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedGroupRow),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Save failed: ${response.status} ${text}`);
      }
         const saved = await response.json();
         console.log('Client saved successfully:', saved);
    } catch (err) {
      console.error(err);
      alert('An error occurred while saving. Check console for details.');
    }
  };
  

  useEffect(() => {
    switch (mode) {
      case 'new':
        setIsEditable(true)
        setSelectedGroupRow({});
        break

      case 'edit':
        setIsEditable(true)
        break

      case 'view':
        setIsEditable(false)
        break

      case 'delete':
        setIsEditable(false)
        break

      default:
        // If you ever receive some unexpected mode string, default to read-only:
        setIsEditable(false)
        break
    }
  }, [mode])

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
                  <EditClientInformationA selectedGroupRow={selectedGroupRow} isEditable={isEditable} setSelectedGroupRow={setSelectedGroupRow} />
                </div>
              </CCol>
              <CCol style={{ flex: '0 0 55%', maxWidth: '55%', height: '420px', paddingTop: '12px' }}>
                <EditClientInformationB selectedGroupRow={selectedGroupRow} isEditable={isEditable} setSelectedGroupRow={setSelectedGroupRow} />
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button variant="outlined" size="small">Back</Button>
              </CCol>
              <CCol style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="contained" size="small" onClick={handleSave}>Save</Button>
                <Button variant="outlined" size="small">Next</Button>
              </CCol>
            </CRow>
          </>
        )}
        {tabIndex === 1 && (
          <Box>
            <EditClientEmailSetup selectedGroupRow={selectedGroupRow} isEditable={isEditable} />
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <EditClientReport  selectedGroupRow={selectedGroupRow} isEditable={isEditable}  />
          </Box>
        )}
        {tabIndex === 3 && (
          <Box>
             <EditAtmCashPrefix  sysPrinsPrefixes={selectedGroupRow.sysPrinsPrefixes} isEditable={isEditable}  />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ClientInformationWindow;
