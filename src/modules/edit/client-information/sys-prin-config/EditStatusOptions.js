import React from 'react';
import {
  CCard, CCardBody, CCol, CRow,
} from '@coreui/react';
import {
  Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';

const selectStyle = {
  fontSize: '0.95rem',
  fontFamily: 'Segoe UI, sans-serif',
  fontWeight: '500',
};

const EditStatusOptions = ({ selectedData, statusMap, setStatusMap, isEditable }) => {
  const leftStatuses  = ['a', 'b', 'c', 'd', 'e', 'f'];
  const rightStatuses = ['i', 'l', 'o', 'u', 'x', 'z'];

  /* code → label 对照 */
  const OPTIONS = {
    0: 'Return',
    1: 'Destroy',
    2: 'Research / Destroy',
    3: 'Research / Return',
    4: 'Research / Carrier Ret',
  };

  const dropdownOptionsMap = {
    a: [0, 1, 2, 3, 4],
    b: [0, 1],
    c: [0, 1, 2, 3, 4],
    d: [0, 1, 2, 3, 4],
    e: [0, 1, 2, 3, 4],
    f: [0, 1, 2, 3, 4],
    i: [0, 1, 2, 3, 4],
    l: [0, 1],
    o: [0, 1, 2, 3, 4],
    u: [0, 1],
    x: [0, 1, 2, 3, 4],
    z: [0, 1],
  };

  const handleChange = (key, value) => {
    const statusKey = `stat${key.toUpperCase()}`;
    setStatusMap((prev) => ({
      ...prev,
      [statusKey]: value,
    }));
  };

  const renderSelect = (key) => {
    const statusKey = `stat${key.toUpperCase()}`;

    return (
      <div
        key={key}
        className="d-flex align-items-center mb-4"
        style={{ gap: '12px' }}
      >
        <FormControl fullWidth size="small">
          <InputLabel id={`${statusKey}-label`}>
            {`${key.toUpperCase()} Status`}
          </InputLabel>
          <Select
            labelId={`${statusKey}-label`}
            id={statusKey}
            value={selectedData[statusKey] ?? ''}  
            label={`${key.toUpperCase()} Status`}
            onChange={(e) => handleChange(key, e.target.value)}
            style={selectStyle}
            disabled={!isEditable}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {dropdownOptionsMap[key].map((code) => (
              <MenuItem key={code} value={code}>
                {OPTIONS[code]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm={6}>
                <CCardBody className="d-flex flex-column gap-3">
                  {leftStatuses.map(renderSelect)}
                </CCardBody>
              </CCol>
              <CCol sm={6}>
                <CCardBody className="d-flex flex-column gap-3">
                  {rightStatuses.map(renderSelect)}
                </CCardBody>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default EditStatusOptions;
