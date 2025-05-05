import React, { useEffect, useState } from 'react';

import {
  CCard,
  CCardBody,
  CCol,
  CFormSelect,
  CRow,
  CButton
} from '@coreui/react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import '../../../scss/sys-prin-configuration/client-atm-pin-prefixes.scss';

const ReMailOptions = ({
  nonUS, setNonUS,
  poBox, setPoBox,
  undeliverable, setUndeliverable,
  badState, setBadState,
  tempAwayAtts, setTempAwayAtts,
  tempAway, setTempAway,
  invalidDelivAreas, setInvalidDelivAreas,
  forwardingAddress, setForwardingAddress,
  holdDays, setHoldDays
}) => {

  useEffect(() => {
    console.log("ReMailOptions received undeliverable:", undeliverable);
  }, [undeliverable]);

  const [selectedInvalidAreas, setSelectedInvalidAreas] = useState([]);

  useEffect(() => {
    if (invalidDelivAreas?.length > 0) {
      const areaNames = invalidDelivAreas.map(area => area.area); // like "Los Angeles, VT 28329"
      setSelectedInvalidAreas(areaNames);
    } else {
      setSelectedInvalidAreas([]);
    }
  }, [invalidDelivAreas]);
  


  return (
    <CRow className="d-flex justify-content-between align-items-stretch h-100">
      {/* Left Column */}
      <CCol xs={6} className="d-flex justify-content-start">
        <CCard className="mb-0 w-100 d-flex">
          <CCardBody className="d-flex flex-column" style={{ gap: '40px' }}>
            <TextField
                label="Days to Hold"
                variant="outlined"
                fullWidth
                size="small"
                value={holdDays}
                onChange={(e) => setHoldDays(e.target.value)}
              />
              <TextField
                label="Days to Hold Temp Aways"
                variant="outlined"
                fullWidth
                size="small"
                value={tempAway}
                onChange={(e) => setTempAway(e.target.value)}
              />
              <TextField
                label="Re-Mail Attempts"
                variant="outlined"
                fullWidth
                size="small"
                value={tempAwayAtts}
                onChange={(e) => setTempAwayAtts(e.target.value)}
              />

            <FormControl fullWidth size="small">
              <InputLabel id="undeliverable-label">Unable to Deliver</InputLabel>
              <Select
                labelId="undeliverable-label"
                id="undeliverable"
                value={undeliverable || ''}
                label="Unable to Deliver"
                onChange={(e) => setUndeliverable(e.target.value)}
              >
                <MenuItem value="0">Return</MenuItem>
                <MenuItem value="1">Destroy</MenuItem>
                <MenuItem value="2">Research Destroy</MenuItem>
                <MenuItem value="3">Research / Return</MenuItem>
                <MenuItem value="4">Research / Carrier Ret</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="forwarding-label">Forwarding Address</InputLabel>
              <Select
                labelId="forwarding-label"
                id="forwarding"
                value={forwardingAddress || ''}
                label="Forwarding Address"
                onChange={(e) => setForwardingAddress(e.target.value)}
              >
                <MenuItem value="1">Re-Mail</MenuItem>
                <MenuItem value="2">Research</MenuItem>
              </Select>
            </FormControl>       
          </CCardBody>
        </CCard>
      </CCol>

      {/* Right Column */}
      <CCol xs={6} className="d-flex justify-content-end">
        <CCard className="mb-0 w-100" style={{ height: '100%' }}>
          <CCardBody className="d-flex flex-column h-100 gap-3">
            <h4 className="text-body-secondary small">
                <code>Do Not Deliver to ...</code>
            </h4>
            <CFormSelect
                size="lg"
                multiple
                aria-label="Do Not Deliver States"
                value={selectedInvalidAreas}
                onChange={(e) => {
                  const options = Array.from(e.target.selectedOptions, option => option.value);
                  setSelectedInvalidAreas(options);
                }}
                style={{
                  height: '150px',           // 👈 set fixed height for 2 rows
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '0.95rem',
                  resize: 'none',
                  overflowY: 'auto'
                }}
              >
                {invalidDelivAreas?.map((area, index) => (
                  <option key={index} value={area.area}>
                    {area.area}
                  </option>
                ))}
              </CFormSelect>

            <FormControl fullWidth size="small">
              <InputLabel id="nonus-label">Non-US</InputLabel>
              <Select
                labelId="nonus-label"
                id="nonus"
                value={nonUS || ''}
                label="Non-US"
                onChange={(e) => setNonUS(e.target.value)}
              >
                <MenuItem value="1">Return</MenuItem>
                <MenuItem value="2">Destroy</MenuItem>
                <MenuItem value="3">In Process</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="pobox-label">Address is P.O. Box</InputLabel>
              <Select
                labelId="pobox-label"
                id="pobox"
                value={poBox || ''}
                label="Address is P.O. Box"
                onChange={(e) => setPoBox(e.target.value)}
              >
                <MenuItem value="1">Return</MenuItem>
                <MenuItem value="2">Destroy</MenuItem>
                <MenuItem value="3">In Process</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="badstate-label">Invalid State</InputLabel>
              <Select
                labelId="badstate-label"
                id="badstate"
                value={badState || ''}
                label="Invalid State"
                onChange={(e) => setBadState(e.target.value)}
              >
                <MenuItem value="1">Return</MenuItem>
                <MenuItem value="2">Destroy</MenuItem>
                <MenuItem value="3">In Process</MenuItem>
              </Select>
            </FormControl>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} className="d-flex justify-content-center gap-3 mt-3">
      </CCol>
    </CRow>
  );
};

export default ReMailOptions;
