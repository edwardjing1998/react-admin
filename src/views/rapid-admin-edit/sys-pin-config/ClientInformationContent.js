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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import '../../../scss/sys-prin-configuration/client-information.scss'

const ClientInformationContent = ({ selectedData }) => {
  const [reportBreaks, setReportBreaks] = React.useState('')
  const [searchType, setSearchType] = React.useState('')

  React.useEffect(() => {
    if (selectedData) {
      setReportBreaks(String(selectedData.reportBreakFlag ?? ''))
      setSearchType(String(selectedData.chLookUpType ?? ''))
    }
  }, [selectedData])

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
                value={selectedData.client}
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flex: 2 }}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                value={selectedData.name}
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>

          {/* Address and City/State/Zip */}
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flexBasis: '48%', flexGrow: 3 }}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                size="small"
                value={selectedData.address}
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flexBasis: '15%', flexGrow: 1 }}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                size="small"
                value={selectedData.city}
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flexBasis: '15%', flexGrow: 1 }}>
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                size="small"
                value={selectedData.state}
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flexBasis: '15%', flexGrow: 1 }}>
              <TextField
                label="Zip Code"
                variant="outlined"
                fullWidth
                size="small"
                value={selectedData.zip}
                InputProps={{ readOnly: true }}
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
              value={selectedData.contact}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Fax + Checkboxes + Moved Reports Breaks */}
          {[
            { id: 'client-active', label: 'Client Active', value: selectedData.active },
            { id: 'sysprin-active', label: 'SYS/PRIN Active', value: selectedData.sysPrinActive === true || selectedData.sysPrinActive === 'Y' },
            { id: 'positive-reporting', label: 'Positive Reporting', value: selectedData.positiveReports },
            { id: 'sub-client', label: 'Sub Client', value: selectedData.subClientInd },
            { id: 'amex-issued', label: 'Check here: if American Express Issued', value: selectedData.amexIssued },
          ].map((item, idx) => (
            <Box key={item.id} sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                {item.id === 'positive-reporting' && (
                  <TextField
                    label="Billing Sys/Prin"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={selectedData.billingSp || ''}
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                {item.id === 'sysprin-active' && (
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={selectedData.phone || ''}
                    InputProps={{ readOnly: true }}
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
                    value={selectedData.faxNumber || ''}
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <CFormCheck
                  type="checkbox"
                  id={item.id}
                  checked={!!item.value}
                  label={item.label}
                  readOnly
                />
              </Box>
            </Box>
          ))}

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <CButton color="secondary" size="sm">Ok</CButton>
            <CButton color="secondary" size="sm">New</CButton>
            <CButton color="secondary" size="sm">Cancel</CButton>
          </Box>
        </CCardBody>
      </CCard>
    </CForm>
  )
}

export default ClientInformationContent
