import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ClientInformationA = ({ selectedGroupRow, isEditable, setSelectedGroupRow }) => {
  const handleChange = (field) => (e) => {
    setSelectedGroupRow((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const sharedSx = {
    '& .MuiInputBase-root': {
      height: '30px',           // Set total height of the input box
      fontSize: '0.75rem',
    },
    '& .MuiInputBase-input': {
      padding: '4px 4px',       // Inner padding
      height: '30px',           // Force smaller height for input
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
    '& .MuiInputBase-input.Mui-disabled': {
      color: 'black',
      WebkitTextFillColor: 'black',
    },
    '& .MuiInputLabel-root.Mui-disabled': {
      color: 'black',
    },
  };
  
  return (
    <>
      <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '12px' }}>
        Client Information
      </div>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField
          label="Client ID"
          value={selectedGroupRow.client}
          onChange={handleChange('client')}
          size="small"
          fullWidth
          disabled={!isEditable}
          sx={sharedSx}
        />
        <TextField
          label="Name"
          value={selectedGroupRow.name}
          onChange={handleChange('name')}
          size="small"
          fullWidth
          disabled={!isEditable}
          sx={sharedSx}
        />
        <TextField
          label="Address Line"
          value={selectedGroupRow.addr || ''}
          onChange={handleChange('addr')}
          size="small"
          fullWidth
          disabled={!isEditable}
          sx={sharedSx}
        />
        <TextField
          label="City"
          value={selectedGroupRow.city || ''}
          onChange={handleChange('city')}
          size="small"
          fullWidth
          disabled={!isEditable}
          sx={sharedSx}
        />
        <TextField
          label="State"
          value={selectedGroupRow.state || ''}
          onChange={handleChange('state')}
          size="small"
          fullWidth
          disabled={!isEditable}
          sx={sharedSx}
        />
        <TextField
          label="Zip Code"
          value={selectedGroupRow.zip || ''}
          onChange={handleChange('zip')}
          size="small"
          fullWidth
          disabled={!isEditable}
          sx={sharedSx}
        />
        <TextField
          label="Contact"
          value={selectedGroupRow.contact}
          onChange={handleChange('contact')}
          size="small"
          fullWidth
          disabled={!isEditable}
          sx={sharedSx}
        />
        <TextField
          label="Fax Number"
          value={selectedGroupRow.faxNumber}
          onChange={handleChange('faxNumber')}
          size="small"
          fullWidth
          disabled={!isEditable}
          sx={sharedSx}
        />
        {/* Optionally re-enable this one if needed */}
        {/* <TextField
          label="Billing Sys/Prin"
          value={selectedGroupRow.billingSp}
          onChange={handleChange('billingSp')}
          size="small"
          fullWidth
          disabled={!isEditable}
          sx={sharedSx}
        /> */}
      </Box>
    </>
  );
};

export default ClientInformationA;
