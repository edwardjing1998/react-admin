// EditReMailOptions.js
import React, { useEffect, useState } from 'react';

import {
  CCard,
  CCardBody,
  CCol,
  CFormSelect,
  CRow,
  CButton,
} from '@coreui/react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import '../../../../scss/sys-prin-configuration/client-atm-pin-prefixes.scss';

import {
    unableToDeliver,
    forwardingAddress,
    nonUs,
    invalidState,
    isPOBox,
  } from '../utils/FieldValueMapping';

const EditReMailOptions = ({ selectedData, setSelectedData, isEditable }) => {

  const getvalue = (field, fallback = '') => selectedData?.[field] ?? fallback;

  const normaliseAreaArray = (arr) =>
    arr.map((area) =>
      typeof area === 'string' ? { area, sysPrin: selectedData.sysPrin ?? '' } : area
    );

  const getAreaNames = () =>
    getvalue('invalidDelivAreas', []).map((a) => (typeof a === 'string' ? a : a.area));

  const [selectedInvalidAreas, setSelectedInvalidAreas] = useState([]);

  useEffect(() => {
    setSelectedInvalidAreas(getAreaNames());
  }, [selectedData?.invalidDelivAreas]);

  const updateField = (field) => (value) =>
    setSelectedData((prev) => ({ ...prev, [field]: value }));

  const handleInvalidAreasChange = (e) => {
    const areas = Array.from(e.target.selectedOptions, (o) => o.value);
    setSelectedInvalidAreas(areas);
    updateField('invalidDelivAreas')(normaliseAreaArray(areas));
  };

  return (
    <CRow className="d-flex justify-content-between align-items-stretch">
      {/* ----------- LEFT column ----------- */}
      <CCol xs={6} className="d-flex justify-content-start">
        <CCard className="mb-0 w-100 d-flex">
          <CCardBody className="d-flex flex-column" style={{ gap: '40px' }}>
            {/* Days to Hold */}
            <TextField
              label="Days to Hold"
              variant="outlined"
              fullWidth
              size="small"
              value={getvalue('holdDays')}
              onChange={(e) => updateField('holdDays')(e.target.value)}
            />

            {/* Days to Hold Temp Aways */}
            <TextField
              label="Days to Hold Temp Aways"
              variant="outlined"
              fullWidth
              size="small"
              value={getvalue('tempAway')}
              onChange={(e) => updateField('tempAway')(e.target.value)}
            />

            {/* Re-Mail Attempts */}
            <TextField
              label="Re-Mail Attempts"
              variant="outlined"
              fullWidth
              size="small"
              value={getvalue('tempAwayAtts')}
              onChange={(e) => updateField('tempAwayAtts')(e.target.value)}
            />

            {/* Undeliverable select */}
            <FormControl fullWidth size="small">
              <InputLabel id="undeliverable-label">Unable to Deliver</InputLabel>
              <Select
                labelId="undeliverable-label"
                id="undeliverable"
                value={getvalue('undeliverable')}
                label="Unable to Deliver"
                onChange={(e) => updateField('undeliverable')(e.target.value)}
                disabled={!isEditable}
              >
                {unableToDeliver.map((opt) => (
                  <MenuItem key={opt.code} value={opt.code}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Forwarding select */}
            <FormControl fullWidth size="small">
              <InputLabel id="forwarding-label">Forwarding Address</InputLabel>
              <Select
                labelId="forwarding-label"
                id="forwarding"
                value={getvalue('forwardingAddress')}
                label="Forwarding Address"
                onChange={(e) => updateField('forwardingAddress')(e.target.value)}
                disabled={!isEditable}
              >
                {forwardingAddress.map((opt) => (
                  <MenuItem key={opt.code} value={opt.code}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CCardBody>
        </CCard>
      </CCol>

      {/* ----------- RIGHT column ----------- */}
      <CCol xs={6} className="d-flex justify-content-end">
        <CCard className="mb-0 w-100" style={{ height: 'auto' }}>
          <CCardBody className="d-flex flex-column gap-3">
            <h4 className="text-body-secondary small mb-1">
              <code>Do Not Deliver to …</code>
            </h4>

            {/* “Do Not Deliver to” multi‐select */}
            <CFormSelect
              size="lg"
              multiple
              aria-label="Do Not Deliver States"
              value={selectedInvalidAreas}
              onChange={handleInvalidAreasChange}
              style={{ height: '150px', overflowY: 'auto', fontSize: '0.95rem' }}
            >
              {getvalue('invalidDelivAreas', []).map((area, idx) => {
                const name = typeof area === 'string' ? area : area.area;
                return (
                  <option key={idx} value={name}>
                    {name}
                  </option>
                );
              })}
            </CFormSelect>

            {/* Non-US select */}
            <FormControl fullWidth size="small">
              <InputLabel id="nonus-label">Non-US</InputLabel>
              <Select
                labelId="nonus-label"
                id="nonus"
                value={getvalue('nonUS')}
                label="Non-US"
                onChange={(e) => updateField('nonUS')(e.target.value)}
                disabled={!isEditable}
              >
                {nonUs.map((opt) => (
                  <MenuItem key={opt.code} value={opt.code}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* P.O. Box select */}
            <FormControl fullWidth size="small">
              <InputLabel id="pobox-label">Address is P.O. Box</InputLabel>
              <Select
                labelId="pobox-label"
                id="pobox"
                value={getvalue('poBox')}
                label="Address is P.O. Box"
                onChange={(e) => updateField('poBox')(e.target.value)}
                disabled={!isEditable}
              >
                {isPOBox.map((opt) => (
                  <MenuItem key={opt.code} value={opt.code}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Invalid State select */}
            <FormControl fullWidth size="small">
              <InputLabel id="badstate-label">Invalid State</InputLabel>
              <Select
                labelId="badstate-label"
                id="badstate"
                value={getvalue('badState')}
                label="Invalid State"
                onChange={(e) => updateField('badState')(e.target.value)}
                disabled={!isEditable}
              >
                {invalidState.map((opt) => (
                  <MenuItem key={opt.code} value={opt.code}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* “Not Deliver…” button (right-aligned) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <CButton
                size="sm"
                style={{
                  backgroundColor: '#d1f3f2',
                  color: '#000',
                  fontSize: '0.75rem',
                  padding: '0px 8px',
                  minWidth: 'unset',
                  textAlign: 'center',
                  width: '100px',
                }}
                onClick={() => {
                  console.log('Do not Deliver clicked');
                }}
                disabled={!isEditable}
              >
                Not Deliver…
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default EditReMailOptions;
