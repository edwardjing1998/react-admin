import React, { useState, useEffect } from 'react';
import { CRow, CCol, CCard, CCardBody } from '@coreui/react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import PreviewClientEmails from './PreviewClientEmails';
import PreviewAtmAndCashPrefixes from './PreviewAtmAndCashPrefixes';
import PreviewClientReports from './PreviewClientReports';
import PreviewClientSysPrinList from './PreviewClientSysPrinList';
import {  REPORT_BREAK_OPTIONS, SEARCH_TYPE_OPTIONS } from './utils/FieldValueMapping';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'

const PreviewClientInformation = ({ selectedGroupRow, setEditClientWindow }) => {

      const [isEditable] = useState(false);

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

  return (
    <>
      
      <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '2px' }}>
            <CCardBody
            className="d-flex align-items-center"
            style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
                <p style={{ margin: 0, fontSize:'0.78rem', fontWeight: '500' }}> {selectedGroupRow
                    ? `Selected Client: ${selectedGroupRow.client} - ${selectedGroupRow.name || ''}`
                    : 'No Client Found'}
                </p>
            </CCardBody>
        </CCard>

        <CCard style={{ height: '50px', marginBottom: '4px', marginTop: '15px' }}>
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

        <CCard style={{ marginTop: '15px', marginBottom: '10px' }}>
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
                    control={<Checkbox size="small" checked={selectedGroupRow?.active || ''} disabled={!isEditable} />}
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
                    control={<Checkbox size="small" checked={selectedGroupRow?.positiveReports || ''} disabled={!isEditable} />}
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
                    control={<Checkbox size="small" checked={selectedGroupRow?.positiveReports || ''} disabled={!isEditable} />}
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
                    control={<Checkbox size="small" checked={selectedGroupRow?.excludeFromReport || ''} disabled={!isEditable} />}
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
                    control={<Checkbox size="small" checked={selectedGroupRow?.amexIssued || ''} disabled={!isEditable} />}
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
      
      <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
                className="d-flex align-items-center"
                style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
                <span style={{ fontSize: '0.85rem' }}>Client Sys/Prin List</span>
            </CCardBody>
            </CCard>

            <CCard style={{ height: '150px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
                className="d-flex align-items-center"
                style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
                <div style={{ width: '100%', height: '100%' }}>
                   <PreviewClientSysPrinList data={selectedGroupRow?.sysPrins || []} />
                </div>
            </CCardBody>
            </CCard>

            <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
                className="d-flex align-items-center"
                style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
                <span style={{ fontSize: '0.85rem' }}>Client Reports</span>
            </CCardBody>
            </CCard>

            <CCard style={{ height: '150px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
                className="d-flex align-items-center"
                style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
                <div style={{ width: '100%', height: '100%' }}>
                <PreviewClientReports data={selectedGroupRow?.reportOptions || []}  />
                </div>
            </CCardBody>
      </CCard>
      
      <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
                className="d-flex align-items-center"
                style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
                <span style={{ fontSize: '0.85rem' }}>ATM Cash Prefixes</span>
            </CCardBody>
        </CCard>
        <CCard style={{ height: '150px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
                className="d-flex align-items-center"
                style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
                <div style={{ width: '100%', height: '100%' }}>
                <PreviewAtmAndCashPrefixes data={selectedGroupRow?.sysPrinsPrefixes || []} />
                </div>
            </CCardBody>
      </CCard>

      <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '15px' }}>
        <CCardBody
            className="d-flex align-items-center"
            style={{ padding: '0.25rem 0.5rem', height: '100%' }}
        >
            <span style={{ fontSize: '0.85rem' }}>Client Emails</span>
        </CCardBody>
      </CCard>
        
      <CCard style={{ height: '150px', marginBottom: '4px', marginTop: '15px' }}>
        <CCardBody
          className="d-flex align-items-center"
          style={{ padding: '0.25rem 0.5rem', height: '100%' }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <PreviewClientEmails data={selectedGroupRow?.clientEmail || []} />
          </div>
        </CCardBody>
      </CCard>

      <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '25px' }}>
        <CCardBody
          className="d-flex align-items-center"
          style={{ padding: '0.25rem 0.5rem', height: '100%' }}
        >
          <div>
            <Button
              variant="outlined"
              size="small"
              sx={{ fontSize: '0.78rem', marginRight: '6px', textTransform: 'none' }}
            >
              Delete Client
            </Button>
            <Button
              variant="outlined"
              onClick={() => setEditClientWindow(true)}
              size="small"
              sx={{ fontSize: '0.78rem', textTransform: 'none', marginRight: '6px' }}
            >
              Edit Client
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ fontSize: '0.78rem', marginRight: '6px', textTransform: 'none' }}
            >
              New Client
            </Button>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default PreviewClientInformation;
