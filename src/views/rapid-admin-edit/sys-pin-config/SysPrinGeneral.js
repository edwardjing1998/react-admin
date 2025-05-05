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

import '../../../scss/sys-prin-configuration/client-atm-pin-prefixes.scss'; // Import custom styles

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '60px',
};

const SysPrinGeneral = ({
  custType,
  setCustType,
  returnStatus,
  setReturnStatus,
  destroyStatus,
  setDestroyStatus,

  special,
  setSpecial,
  pinMailer,
  setPinMailer,

  nm13,
  setNm13,
  active,
  setActive,
  addrFlag,
  setAddrFlag,
  rps,
  setRps,
  astatRch,
  setAstatRch
}) => {

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardBody>
            <div style={rowStyle} className="mb-3">
              <FormControl fullWidth size="small">
                <InputLabel id="customer-type-label">Customer Type</InputLabel>
                <Select
                  labelId="customer-type-label"
                  id="customer-type"
                  value={custType}
                  label="Customer Type"
                  onChange={(e) => setCustType(e.target.value)}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="0">Full Processing</MenuItem>
                  <MenuItem value="1">Destroy All</MenuItem>
                  <MenuItem value="2">Return All</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={rowStyle} className="mb-3">
              <FormControl fullWidth size="small">
                <InputLabel id="return-status-label">Return Status</InputLabel>
                <Select
                  labelId="return-status-label"
                  id="return-status"
                  value={returnStatus}
                  label="Return Status"
                  onChange={(e) => setReturnStatus(e.target.value)}
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
              <FormControl fullWidth size="small">
                <InputLabel id="destroy-status-label">Destroy Status</InputLabel>
                <Select
                  labelId="destroy-status-label"
                  id="destroy-status"
                  value={destroyStatus}
                  label="Destroy Status"
                  onChange={(e) => setDestroyStatus(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="0">Destroy</MenuItem>
                  <MenuItem value="1">Return</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={rowStyle} className="mb-3">
              <FormControl fullWidth size="small">
                <InputLabel id="special-label">Special</InputLabel>
                <Select
                  labelId="special-label"
                  id="special-option"
                  value={special}
                  label="Special"
                  onChange={(e) => setSpecial(e.target.value)}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="1">Destroy</MenuItem>
                  <MenuItem value="2">Return</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={rowStyle}>
              <FormControl fullWidth size="small">
                <InputLabel id="pin-mailer-label">Pin Mailer</InputLabel>
                <Select
                  labelId="pin-mailer-label"
                  id="pin-mailer"
                  value={pinMailer}
                  label="Pin Mailer"
                  onChange={(e) => setPinMailer(e.target.value)}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="0">Destroy</MenuItem>
                  <MenuItem value="1">Return</MenuItem>
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
                onChange={(e) => setActive(e.target.checked ? 'Y' : 'N')}
              />
            </div>
            <div style={rowStyle} className="mb-3">
              <CFormCheck
                type="checkbox"
                id="rps-customer"
                label="RPS Customer"
                checked={rps === 'Y'}
                onChange={(e) => setRps(e.target.checked ? 'Y' : 'N')}
              />
            </div>
            <div style={rowStyle} className="mb-3">
              <CFormCheck
                type="checkbox"
                id="flag-undeliverable"
                label="Flag Undeliverable an Invalid Address"
                checked={addrFlag === 'Y'}
                onChange={(e) => setAddrFlag(e.target.checked ? 'Y' : 'N')}
              />
            </div>
            <div style={rowStyle} className="mb-3">
              <CFormCheck
                type="checkbox"
                id="status-research"
                label="A Status Accounts Going in Research"
                checked={astatRch === '1'}
                onChange={(e) => setAstatRch(e.target.checked ? '1' : '0')}
              />
            </div>
            <div style={rowStyle}>
              <CFormCheck
                type="checkbox"
                id="perform-non-mon"
                label="Perform Non Mon 13 on Destroy"
                checked={nm13 === '1'}
                onChange={(e) => setNm13(e.target.checked ? '1' : '0')}
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SysPrinGeneral;