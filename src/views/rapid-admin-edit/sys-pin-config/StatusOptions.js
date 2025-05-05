import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const selectStyle = {
  fontSize: '0.95rem',
  fontFamily: 'Segoe UI, sans-serif',
  fontWeight: '500',
};

const StatusOptions = ({ statusMap, setStatusMap }) => {
  const leftStatuses = ["a", "b", "c", "d", "e", "f"];
  const rightStatuses = ["i", "l", "o", "u", "x", "z"];

  const dropdownOptionsMap = {
    a: ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"],
    b: ["Destroy", "Return"],
    c: ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"],
    d: ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"],
    e: ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"],
    f: ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"],
    i: ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"],
    l: ["Destroy", "Return"],
    o: ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"],
    u: ["Destroy", "Return"],
    x: ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"],
    z: ["Destroy", "Return"]
  };

  useEffect(() => {
    const initial = {};
    [...leftStatuses, ...rightStatuses].forEach(k => {
      const statusKey = `stat${k.toUpperCase()}`;
      initial[statusKey] = statusMap?.[statusKey] || '';
    });
    setStatusMap(initial); // Initialize in parent
  }, []);

  const handleChange = (key, value) => {
    const statusKey = `stat${key.toUpperCase()}`;
    setStatusMap(prev => ({
      ...prev,
      [statusKey]: value
    }));
  };

  const renderSelect = (key) => {
    const statusKey = `stat${key.toUpperCase()}`;
    return (
      <div className="d-flex align-items-center mb-4" style={{ gap: '12px' }} key={key}>
        <FormControl fullWidth size="small">
          <InputLabel id={`${statusKey}-label`}>{`${key.toUpperCase()} Status`}</InputLabel>
          <Select
            labelId={`${statusKey}-label`}
            id={statusKey}
            value={statusMap[statusKey] || ''}
            label={`${key.toUpperCase()} Status`}
            onChange={(e) => handleChange(key, e.target.value)}
            style={selectStyle}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {dropdownOptionsMap[key]?.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
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

export default StatusOptions;
