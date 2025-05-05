import React from 'react'
import {
  CForm,
  CFormCheck,
  CButton,
  CCard,
  CCardBody
} from '@coreui/react'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


import '../../../scss/sys-prin-configuration/client-information.scss'

  const ClientInformationContent = ({ selectedData }) => {
    const [clientId, setClientId] = React.useState('');
    const [reportBreaks, setReportBreaks] = React.useState('');
    const [searchType, setSearchType] = React.useState('');
    const [name, setName] = React.useState('');

    const [addr, setAddr] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [contact, setContact] = React.useState('');

    const [billingSp, setBillingSp] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [faxNumber, setFaxNumber] = React.useState('');  
    
    const [clientActive, setClientActive] = React.useState(false);
    const [positiveReporting, setPositiveReporting] = React.useState(false);
    const [subClientInd, setSubClientInd] = React.useState(false);
    const [amexIssued, setAmexIssued] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');
  
    React.useEffect(() => {
      if (selectedData) {
        setClientId(selectedData.client || '');
        setReportBreaks(String(selectedData.reportBreakFlag ?? ''));
        setSearchType(String(selectedData.chLookUpType ?? ''));
        setName(selectedData.name || '');

        setAddr(selectedData.addr || '');
        setCity(selectedData.city || '');
        setState(selectedData.state || '');
        setZip(selectedData.zip || '');
        setContact(selectedData.contact || '');

        setBillingSp(selectedData.billingSp || '');
        setPhone(selectedData.phone || '');
        setFaxNumber(selectedData.faxNumber || '');
        setReportBreaks(String(selectedData.reportBreakFlag ?? ''));
        setSearchType(String(selectedData.chLookUpType ?? ''));

        setClientActive(!!selectedData.active);

        setPositiveReporting(!!selectedData.positiveReports);
        setSubClientInd(!!selectedData.subClientInd);
        setAmexIssued(!!selectedData.amexIssued);

      }
    }, [selectedData]);

      const handleNew = () => {
        setClientId('');
        setName('');
        setAddr('');
        setCity('');
        setState('');
        setZip('');
        setContact('');
        setBillingSp('');
        setPhone('');
        setFaxNumber('');
        setReportBreaks('');
        setSearchType('');
      
        setClientActive(false);
        setPositiveReporting(false);
        setSubClientInd(false);
        setAmexIssued(false);
      };
    
      const handleOk = async () => {
        const clientData = {
          client: clientId,
          name: name,
          addr: addr,
          city: city,
          state: state,
          zip: zip,
          contact: contact,
          phone: phone,
          faxNumber: faxNumber,
          billingSp: billingSp,
          reportBreakFlag: Number(reportBreaks),
          chLookUpType: Number(searchType),
          active: clientActive,
          excludeFromReport: false,
          positiveReports: positiveReporting,
          subClientInd: subClientInd,
          subClientXref: 'XREF001', // You can replace with a form field if needed
          amexIssued: amexIssued,
          reportOptions: [],
          sysPrinsPrefixes: [],
          sysPrins: [],
          clientEmails: []
        }
      
        try {
          const response = await fetch('http://localhost:4444/api/client/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData)
          })
      
          if (!response.ok) throw new Error('Failed to save client data')
      
          const result = await response.json()
          setSuccessMessage('✅ Client saved successfully!')
          console.log(result)
        } catch (error) {
          console.error('Error saving client:', error)
          alert('Error saving client.')
        }
      }
      
  return (
    <CForm>
      <CCard className="mb-4">
        <CCardBody>
          {/* Client ID & Name */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
            <TextField
              label="Client ID"
              variant="outlined"
              fullWidth
              size="small"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            </Box>
            <Box sx={{ flex: 2 }}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

            </Box>
          </Box>

          {/* Address and City/State/Zip */}
          {/* Address and City/State/Zip */}
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flexBasis: '48%', flexGrow: 3 }}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                size="small"
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flexBasis: '15%', flexGrow: 1 }}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                size="small"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flexBasis: '15%', flexGrow: 1 }}>
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                size="small"
                value={state}
                onChange={(e) => setState(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flexBasis: '15%', flexGrow: 1 }}>
              <TextField
                label="Zip Code"
                variant="outlined"
                fullWidth
                size="small"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>

          {/* Contact */}
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Contact"
              variant="outlined"
              fullWidth
              size="small"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Fax + Checkboxes + Moved Reports Breaks */}
          {[

            { id: 'client-active', label: 'Client Active', checked: clientActive, onChange: () => setClientActive(!clientActive) },
            { id: 'positive-reporting', label: 'Positive Reporting', checked: positiveReporting, onChange: () => setPositiveReporting(!positiveReporting) },
            { id: 'sub-client', label: 'Sub Client', checked: subClientInd, onChange: () => setSubClientInd(!subClientInd) },
            { id: 'amex-issued', label: 'Check here: if American Express Issued', checked: amexIssued, onChange: () => setAmexIssued(!amexIssued) },

          ].map((item, idx) => (
            <Box key={item.id} sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                {item.id === 'positive-reporting' && (
                  <TextField
                    label="Billing Sys/Prin"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={billingSp}
                    onChange={(e) => setBillingSp(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                {item.id === 'sysprin-active' && (
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                {item.id === 'sub-client' && (
                  <FormControl fullWidth size="small">
                    <InputLabel id="report-breaks-label">Reports Breaks</InputLabel>
                    <Select
                      labelId="report-breaks-label"
                      id="report-breaks"
                      value={reportBreaks}
                      label="Reports Breaks"
                      onChange={(e) => setReportBreaks(e.target.value)}
                    >
                      <MenuItem value="0">None</MenuItem>
                      <MenuItem value="1">System</MenuItem>
                      <MenuItem value="2">Sys/Prin</MenuItem>
                    </Select>
                  </FormControl>
                )}
                {item.id === 'amex-issued' && (
                  <FormControl fullWidth size="small">
                    <InputLabel id="search-type-label">Search Type</InputLabel>
                    <Select
                      labelId="search-type-label"
                      id="search-type"
                      value={searchType}
                      label="Search Type"
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="0">Standard</MenuItem>
                      <MenuItem value="1">Amex-AS400</MenuItem>
                      <MenuItem value="2">AS400</MenuItem>
                    </Select>
                  </FormControl>
                )}
                {idx === 0 && (
                  <TextField
                    label="Fax Number"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={faxNumber}
                    onChange={(e) => setFaxNumber(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              </Box>

              <Box sx={{ flex: 1 }}>
                <CFormCheck
                  type="checkbox"
                  id={item.id}
                  checked={item.checked}
                  label={item.label}
                  onChange={item.onChange}
                />
              </Box>
            </Box>
          ))}

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, alignItems: 'center' }}>
            {successMessage && (
              <Box sx={{ color: 'green', fontSize: '0.85rem', fontWeight: 500, marginRight: 'auto' }}>
                {successMessage}
              </Box>
            )}
            <CButton color="success" size="sm" onClick={handleOk}>Ok</CButton> 
            <CButton color="primary" size="sm" onClick={handleNew}>New</CButton>
            <CButton color="danger" size="sm">Cancel</CButton> 
          </Box>


        </CCardBody>
      </CCard>
    </CForm>
  )
}

export default ClientInformationContent
