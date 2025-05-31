import React from 'react';
import { 
  CCard, 
  CCardBody, 
  CCol, 
  CRow, 
  CFormCheck
} from '@coreui/react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import '../../../../scss/sys-prin-configuration/client-atm-pin-prefixes.scss'; // Import custom styles

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '60px',
};

const SysPrinGeneral = ({ selectedData, setSelectedData, isEditable }) => {
  // Extract fields from selectedData safely
  const custType = selectedData?.custType || '';
  const returnStatus = selectedData?.returnStatus || '';
  const destroyStatus = selectedData?.destroyStatus || '';
  const special = selectedData?.special || '';
  const pinMailer = selectedData?.pinMailer || '';
  const active = selectedData?.active === true || selectedData?.active === 'Y' ? 'Y' : 'N';
  const rps = selectedData?.rps === true || selectedData?.rps === 'Y' ? 'Y' : 'N';
  const addrFlag = selectedData?.addrFlag === true || selectedData?.addrFlag === 'Y' ? 'Y' : 'N';
  const astatRch = selectedData?.astatRch === true || selectedData?.astatRch === '1' ? '1' : '0';
  const nm13 = selectedData?.nm13 === true || selectedData?.nm13 === '1' ? '1' : '0';

  // Handlers
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setSelectedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field) => (e) => {
    const checked = e.target.checked;
    let value = '';
    if (field === 'active' || field === 'rps' || field === 'addrFlag') {
      value = checked ? 'Y' : 'N';
    } else if (field === 'astatRch' || field === 'nm13') {
      value = checked ? '1' : '0';
    }
    setSelectedData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardBody>
            <div style={rowStyle} className="mb-3">
              <FormControl fullWidth size="small" disabled={!isEditable}>
                <InputLabel id="customer-type-label">Customer Type</InputLabel>
                <Select
                  labelId="customer-type-label"
                  id="customer-type"
                  value={custType}
                  label="Customer Type"
                  onChange={handleChange('custType')}
                >
                  <MenuItem value="0"><em>None</em></MenuItem>
                  <MenuItem value="1">Full Processing</MenuItem>
                  <MenuItem value="2">Destroy All</MenuItem>
                  <MenuItem value="3">Return All</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={rowStyle} className="mb-3">
              <FormControl fullWidth size="small" disabled={!isEditable}>
                <InputLabel id="return-status-label">Return Status</InputLabel>
                <Select
                  labelId="return-status-label"
                  id="return-status"
                  value={returnStatus}
                  label="Return Status"
                  onChange={handleChange('returnStatus')}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="A">A Status</MenuItem>
                  <MenuItem value="C">C Status</MenuItem>
                  <MenuItem value="E">E Status</MenuItem>
                  <MenuItem value="F">F Status</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={rowStyle} className="mb-3">
              <FormControl fullWidth size="small" disabled={!isEditable}>
                <InputLabel id="destroy-status-label">Destroy Status</InputLabel>
                <Select
                  labelId="destroy-status-label"
                  id="destroy-status"
                  value={destroyStatus}
                  label="Destroy Status"
                  onChange={handleChange('destroyStatus')}
                >
                  <MenuItem value="0">None</MenuItem>
                  <MenuItem value="1">Destroy</MenuItem>
                  <MenuItem value="2">Return</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={rowStyle} className="mb-3">
              <FormControl fullWidth size="small" disabled={!isEditable}>
                <InputLabel id="special-label">Special</InputLabel>
                <Select
                  labelId="special-label"
                  id="special-option"
                  value={special}
                  label="Special"
                  onChange={handleChange('special')}
                >
                  <MenuItem value="0">None</MenuItem>
                  <MenuItem value="1">Destroy</MenuItem>
                  <MenuItem value="2">Return</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={rowStyle}>
              <FormControl fullWidth size="small" disabled={!isEditable}>
                <InputLabel id="pin-mailer-label">Pin Mailer</InputLabel>
                <Select
                  labelId="pin-mailer-label"
                  id="pin-mailer"
                  value={pinMailer}
                  label="Pin Mailer"
                  onChange={handleChange('pinMailer')}
                >
                  <MenuItem value="0">Non</MenuItem>
                  <MenuItem value="1">Destroy</MenuItem>
                  <MenuItem value="2">Return</MenuItem>
                </Select>
              </FormControl>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardBody>
            <div style={rowStyle} className="mb-3">
              <CFormCheck
                type="checkbox"
                id="sys-prin-active"
                label="Sys/PRIN Active"
                checked={active === 'Y'}
                onChange={handleCheckboxChange('active')}
                disabled={!isEditable}
              />
            </div>
            <div style={rowStyle} className="mb-3">
              <CFormCheck
                type="checkbox"
                id="rps-customer"
                label="RPS Customer"
                checked={rps === 'Y'}
                onChange={handleCheckboxChange('rps')}
                disabled={!isEditable}
              />
            </div>
            <div style={rowStyle} className="mb-3">
              <CFormCheck
                type="checkbox"
                id="flag-undeliverable"
                label="Flag Undeliverable an Invalid Address"
                checked={addrFlag === 'Y'}
                onChange={handleCheckboxChange('addrFlag')}
                disabled={!isEditable}
              />
            </div>
            <div style={rowStyle} className="mb-3">
              <CFormCheck
                type="checkbox"
                id="status-research"
                label="A Status Accounts Going in Research"
                checked={astatRch === '1'}
                onChange={handleCheckboxChange('astatRch')}
                disabled={!isEditable}
              />
            </div>
            <div style={rowStyle}>
              <CFormCheck
                type="checkbox"
                id="perform-non-mon"
                label="Perform Non Mon 13 on Destroy"
                checked={nm13 === '1'}
                onChange={handleCheckboxChange('nm13')}
                disabled={!isEditable}
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SysPrinGeneral;
