// File: EditAtmCashPrefix.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import {
  CRow,
  CCol
} from '@coreui/react';

import DeleteIcon from '@mui/icons-material/Delete';

const EditAtmCashPrefix = ({ sysPrinsPrefixes = [] }) => {
  const [selectedPrefix, setSelectedPrefix] = useState('');

  const selected = sysPrinsPrefixes.find(p => p.prefix === selectedPrefix) || {};
  const [editablePrefix, setEditablePrefix] = useState('');
  const [editableAtmCashRule, setEditableAtmCashRule] = useState('');

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedPrefix(selectedValue);
  
    const matched = sysPrinsPrefixes.find(p => p.prefix === selectedValue);
    setEditablePrefix(matched?.prefix || '');
    setEditableAtmCashRule(matched?.atmCashRule ?? '');
  };
  

  const handleDeleteAtmCashPrefix = () => {
    alert('Delete Atm Cash clicked');
  };

  return (
    <>
      
        <CRow className="mb-2" style={{ gap: '12px', border: '1px solid #ccc', borderRadius: '4px', padding: '12px', height: '640px' }}>
            <CCol style={{ flex: '0 0 45%', maxWidth: '45%' }}>
              <label
                htmlFor="billingSysPrinPrefix"
                style={{
                  fontWeight: '300',
                  fontSize: '0.78rem',
                  marginBottom: '6px',
                  display: 'block',
                }}
              >
                Account Prefix
              </label>
              <select
                id="billingSysPrinPrefix"
                multiple
                size="7"
                style={{
                  width: '100%',
                  height: '70%',
                  padding: '8px',
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  border: '1px solid #ced4da',
                  color: 'black',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  outline: 'none',
                  textAlign: 'left',
                  marginBottom: '16px',
                }}
                onChange={handleSelectChange}
              >
                {sysPrinsPrefixes.map((item, index) => (
                  <option key={index} value={item.prefix} style={{ fontSize: '0.78rem', fontWeight: 300 }}>
                    {`${item.billingSp} - ${item.prefix}`}
                  </option>
                ))}
              </select>
            </CCol>

            <CCol style={{ flex: '0 0 45%', maxWidth: '45%' }}>
                <TextField
                  label="Account Prefix"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={editablePrefix}
                  onChange={(e) => setEditablePrefix(e.target.value)}
                  sx={{
                    backgroundColor: 'white',
                    mb: 2,
                    '& .MuiInputBase-input': {
                      fontSize: '0.75rem',
                      fontWeight: 300,
                    }
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: '0.78rem',
                      fontWeight: 300
                    }
                  }}
                />

                  <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                    <InputLabel id="atm-cash-input-label" sx={{ fontSize: '0.78rem' }}>
                      ATM/Cash
                    </InputLabel>
                    <Select
                        labelId="atm-cash-label"
                        id="atm-cash-prefix"
                        label="ATM/Cash"
                        value={editableAtmCashRule}
                        onChange={(e) => setEditableAtmCashRule(e.target.value)}
                        sx={{
                          '.MuiSelect-select': {
                            fontWeight: 300,
                            fontSize: '0.78rem',
                          }
                        }}
                      >
                        <MenuItem value="" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Select Rule</MenuItem>
                        <MenuItem value="0" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Destroy</MenuItem>
                        <MenuItem value="1" sx={{ fontSize: '0.78rem', fontWeight: 300 }}>Return</MenuItem>
                      </Select>
                  </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                <button
                  onClick={handleDeleteAtmCashPrefix}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <CloseIcon style={{ fontSize: '20px', color: 'gray' }} />
                </button>

                <button
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  New
                </button>
              </Box>
            </CCol>
          </CRow>
      
    </>
  );
};

export default EditAtmCashPrefix;
