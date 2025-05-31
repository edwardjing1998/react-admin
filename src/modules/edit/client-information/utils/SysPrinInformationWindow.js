import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tabs, Tab, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CRow, CCol } from '@coreui/react';

import EditSysPrinGeneral   from '../sys-prin-config/EditSysPrinGeneral';
import EditReMailOptions    from '../sys-prin-config/EditReMailOptions';
import EditStatusOptions    from '../sys-prin-config/EditStatusOptions';
import EditFileReceivedFrom     from '../sys-prin-config/EditFileReceivedFrom';
import EditFileSentTo     from '../sys-prin-config/EditFileSentTo';
import EditSysPrinNotes     from '../sys-prin-config/EditSysPrinNotes';



const SysPrinInformationWindow = ({ onClose, selectedData, setSelectedData, mode }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isEditable, setIsEditable] = useState(true);
  const [statusMap, setStatusMap] = useState({});

  /* ---------- enable / disable fields based on mode ---------- */
  useEffect(() => {
    setIsEditable(mode !== 'delete');
  }, [mode]);

  /* ---------- tab helpers ---------- */
  const maxTabs = 5;                            // total number of tabs
  const nextTab = () => setTabIndex(i => Math.min(i + 1, maxTabs - 1));
  const prevTab = () => setTabIndex(i => Math.max(i - 1, 0));

  return (
    <Box sx={{ p: 2, height: '100%' }}>
      {/* header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>New Client</span>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* tabs */}
      <Tabs
        value={tabIndex}
        onChange={(_, v) => setTabIndex(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mt: 1, mb: 2 }}
      >
        <Tab label="General"         sx={{ fontSize: '0.78rem', textTransform: 'none', minWidth:  60 }} />
        <Tab label="Remail Options"  sx={{ fontSize: '0.78rem', textTransform: 'none', minWidth: 160 }} />
        <Tab label="Status Options"  sx={{ fontSize: '0.78rem', textTransform: 'none', minWidth: 160 }} />
        <Tab label="File Received From"  sx={{ fontSize: '0.78rem', textTransform: 'none', minWidth: 160 }} />
        <Tab label="File Sent To"  sx={{ fontSize: '0.78rem', textTransform: 'none', minWidth: 160 }} />
        <Tab label="SysPrin Note"  sx={{ fontSize: '0.78rem', textTransform: 'none', minWidth: 160 }} />
      </Tabs>

      {/* ----- tab panels ----- */}
      {tabIndex === 0 && (
        <EditSysPrinGeneral
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          isEditable={isEditable}
        />
      )}

      {tabIndex === 1 && (
        <EditReMailOptions
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          isEditable={isEditable}
        />
      )}

      {tabIndex === 2 && (
        <EditStatusOptions
          selectedData={selectedData}
          statusMap={statusMap}
          setStatusMap={setStatusMap}
          isEditable={isEditable}
        />
      )}

      {tabIndex === 3 && (
        <EditFileReceivedFrom
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          isEditable={isEditable}
        />
      )}

      {tabIndex === 4 && (
        <EditFileSentTo
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          isEditable={isEditable}
        />
      )}

      {tabIndex === 5 && (
        <EditSysPrinNotes
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          isEditable={isEditable}
        />
      )}

      {/* navigation buttons – always visible */}
      <CRow className="mt-3">
        <CCol style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={prevTab}
            disabled={tabIndex === 0}
          >
            Back
          </Button>
        </CCol>

        <CCol style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          {/* you can conditionally render Save per tab if needed */}
          <Button variant="contained" size="small">
            Save
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={nextTab}
            disabled={tabIndex === maxTabs - 1}
          >
            Next
          </Button>
        </CCol>
      </CRow>
    </Box>
  );
};

export default SysPrinInformationWindow;
