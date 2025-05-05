// File: ClientAtmCashPrefix.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ClientAtmCashPrefix = ({ handleDeleteClick, sysPrinsPrefixes = [] }) => {
  const [selectedPrefix, setSelectedPrefix] = useState('');

  const selected = sysPrinsPrefixes.find(p => p.prefix === selectedPrefix) || {};

  const handleSelectChange = (e) => {
    setSelectedPrefix(e.target.value);
  };

  return (
    <>
      <label
        htmlFor="billingSysPrinPrefix"
        style={{
          fontWeight: 'bold',
          fontSize: '14px',
          marginBottom: '6px',
          display: 'block',
        }}
      >
        Client ATM/Cash Prefixes
      </label>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ fontWeight: 300, fontSize: '12px', color: '#6c757d' }}>
          Billing Sys/Prin
        </div>
        <select
          id="billingSysPrinPrefix"
          multiple
          size="7"
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
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
            <option key={index} value={item.prefix}>
              {`${item.billingSp} - ${item.prefix}`}
            </option>
          ))}
        </select>

        <TextField
          label="Account Prefix"
          variant="outlined"
          fullWidth
          size="small"
          value={selected.prefix || ''}
          sx={{ backgroundColor: 'white', fontSize: '14px' }}
        />

        <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
          <InputLabel id="atm-cash-input-label" sx={{ fontSize: '14px' }}>
            ATM/Cash
          </InputLabel>
          <Select
            labelId="atm-cash-label"
            id="atm-cash"
            label="ATM/Cash"
            value={selected.atmCashRule ?? ''}
            sx={{ fontSize: '14px' }}
          >
                <option value="">Select Rule</option>
                <option value="0">Destroy</option>
                <option value="1">Return</option>
          </Select>
        </FormControl>

        <hr
          style={{
            border: 'none',
            borderTop: '1px solid black',
            marginTop: '12px',
            marginBottom: '2px',
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
          <button
            onClick={handleDeleteClick}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <DeleteIcon style={{ fontSize: '35px', color: 'gray' }} />
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
      </div>
    </>
  );
};

export default ClientAtmCashPrefix;

