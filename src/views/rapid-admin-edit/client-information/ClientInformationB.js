// File: ClientInformationB.js
import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ClientInformationB = ({ selectedData, isEditable, setSelectedData, handleDeleteClick }) => {
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setSelectedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field) => (event) => {
    const checked = event.target.checked;
    setSelectedData((prev) => ({ ...prev, [field]: checked }));
  };

  const sharedSx = {
    fontSize: '14px',
    '& .MuiInputBase-input.Mui-disabled': {
      color: 'black',
      WebkitTextFillColor: 'black',
    },
    '& .MuiInputLabel-root.Mui-disabled': {
      color: 'black',
    },
  };

  const labelSx = {
    fontSize: '14px',
    color: isEditable ? 'inherit' : 'black',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Row 0: Phone */}
      <TextField
        label="Phone"
        value={selectedData.phone}
        onChange={handleChange('phone')}
        size="small"
        fullWidth
        disabled={!isEditable}
        sx={sharedSx}
      />

      {/* Row 1: Billing Sys/Prin */}
      <TextField
        label="Billing Sys/Prin"
        value={selectedData.billingSp}
        onChange={handleChange('billingSp')}
        size="small"
        fullWidth
        disabled={!isEditable}
        sx={sharedSx}
      />

      {/* Row 2: Report Breaks */}
      <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
        <InputLabel id="report-breaks-label" sx={labelSx}>Report Breaks</InputLabel>
        <Select
          labelId="report-breaks-label"
          id="report-breaks"
          value={selectedData.reportBreakFlag?.toString() || ''}
          label="Report Breaks"
          onChange={handleChange('reportBreakFlag')}
          disabled={!isEditable}
          sx={sharedSx}
        >
          <MenuItem value="0">None</MenuItem>
          <MenuItem value="1">System</MenuItem>
          <MenuItem value="2">Sys/Prin</MenuItem>
        </Select>
      </FormControl>

      {/* Row 3: Search Type */}
      <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
        <InputLabel id="search-type-label" sx={labelSx}>Search Type</InputLabel>
        <Select
          labelId="search-type-label"
          id="search-type"
          value={selectedData.chLookUpType?.toString() || ''}
          label="Search Type"
          onChange={handleChange('chLookUpType')}
          disabled={!isEditable}
          sx={sharedSx}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="0">Standard</MenuItem>
          <MenuItem value="1">Amex-AS400</MenuItem>
          <MenuItem value="2">AS400</MenuItem>
        </Select>
      </FormControl>

      {/* Checkboxes */}
      <FormControlLabel
        control={<Checkbox size="small" checked={!!selectedData.active} onChange={handleCheckboxChange('active')} disabled={!isEditable} />}
        label="Client Active"
        sx={{
          backgroundColor: 'white',
          pl: 1,
          m: 0,
          '& .MuiFormControlLabel-label': { fontSize: '14px', color: 'black' },
          '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
        }}
      />
      <FormControlLabel
        control={<Checkbox size="small" checked={!!selectedData.positiveReports} onChange={handleCheckboxChange('positiveReports')} disabled={!isEditable} />}
        label="Positive Reporting"
        sx={{
          backgroundColor: 'white',
          pl: 1,
          m: 0,
          '& .MuiFormControlLabel-label': { fontSize: '14px', color: 'black' },
          '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
        }}
      />
      <FormControlLabel
        control={<Checkbox size="small" checked={!!selectedData.subClientInd} onChange={handleCheckboxChange('subClientInd')} disabled={!isEditable} />}
        label="Sub Client"
        sx={{
          backgroundColor: 'white',
          pl: 1,
          m: 0,
          '& .MuiFormControlLabel-label': { fontSize: '14px', color: 'black' },
          '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
        }}
      />
      <FormControlLabel
        control={<Checkbox size="small" checked={!!selectedData.amexIssued} onChange={handleCheckboxChange('amexIssued')} disabled={!isEditable} />}
        label="American Express Issued"
        sx={{
          backgroundColor: 'white',
          pl: 1,
          m: 0,
          '& .MuiFormControlLabel-label': { fontSize: '14px', color: 'black' },
          '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
        }}
      />
    </Box>
  );
};

export default ClientInformationB;
