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

const ClientInformationB = ({ selectedGroupRow, isEditable, setSelectedGroupRow }) => {
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setSelectedGroupRow((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field) => (event) => {
    const checked = event.target.checked;
    setSelectedGroupRow((prev) => ({ ...prev, [field]: checked }));
  };

  const sharedSx = {
    '& .MuiInputBase-root': {
      height: '30px',           // Set total height of the input box
      fontSize: '0.78rem',
    },
    '& .MuiInputBase-input': {
      padding: '4px 4px',       // Inner padding
      height: '30px',           // Force smaller height for input
      fontSize: '0.78rem',
      lineHeight: '1rem',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.78rem',
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

  const labelSx = {
    fontSize: '14px',
    color: isEditable ? 'inherit' : 'black',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Row 0: Phone */}
      <TextField
        label="Phone"
        value={selectedGroupRow.phone}
        onChange={handleChange('phone')}
        size="small"
        fullWidth
        disabled={!isEditable}
        sx={sharedSx}
      />

      {/* Row 1: Billing Sys/Prin */}
      <TextField
        label="Billing Sys/Prin"
        value={selectedGroupRow.billingSp}
        onChange={handleChange('billingSp')}
        size="small"
        fullWidth
        disabled={!isEditable}
        sx={sharedSx}
      />

      <FormControl
        fullWidth
        size="small"
        sx={{
          backgroundColor: 'white',
          '& .MuiInputBase-root': {
            height: '30px', // ⬆️ Increased from default (~36px)
            fontSize: '0.78rem',
          },
          '& .MuiSelect-select': {
            padding: '8px 12px', // ⬆️ Vertical padding for taller field
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <InputLabel id="report-breaks-label" sx={{ fontSize: '0.78rem' }}>Report Breaks</InputLabel>
        <Select
          labelId="report-breaks-label"
          id="report-breaks"
          value={selectedGroupRow.reportBreakFlag?.toString() || ''}
          label="Report Breaks"
          onChange={handleChange('reportBreakFlag')}
          disabled={!isEditable}
        >
          <MenuItem value="0">None</MenuItem>
          <MenuItem value="1">System</MenuItem>
          <MenuItem value="2">Sys/Prin</MenuItem>
        </Select>
      </FormControl>

      <FormControl
          fullWidth
          size="small"
          sx={{
            backgroundColor: 'white',
            minHeight: '34px',           // limit container height
            '& .MuiFormLabel-root': {
              fontSize: '0.78rem',       // smaller label
              lineHeight: '1rem',
            },
            '& .MuiInputBase-root': {
              height: '30px',            // total height of select box
              fontSize: '0.78rem',
            },
            '& .MuiSelect-select': {
              padding: '4px 8px',        // reduced padding inside dropdown
              fontSize: '0.78rem',
            },
            '& .Mui-disabled': {
              color: 'black',
            },
          }}
        >
          <InputLabel id="search-type-label">Search Type</InputLabel>
          <Select
            labelId="search-type-label"
            id="search-type"
            value={selectedGroupRow.chLookUpType?.toString() || ''}
            label="Search Type"
            onChange={handleChange('chLookUpType')}
            disabled={!isEditable}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="0">Standard</MenuItem>
            <MenuItem value="1">Amex-AS400</MenuItem>
            <MenuItem value="2">AS400</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={!!selectedGroupRow.active}
                onChange={handleCheckboxChange('active')}
                disabled={!isEditable}
                sx={{ padding: '2px' }}  // ⬇️ reduced checkbox padding
              />
            }
            label="Client Active"
            sx={{
              backgroundColor: 'white',
              pl: 1,
              mt: 0,
              mb: -1,
              lineHeight: 1,
              minHeight: '24px', // ⬇️ constrain overall height
              '& .MuiFormControlLabel-label': {
                fontSize: '0.78rem',
                color: 'black',
                paddingTop: '2px',
              },
              '& .Mui-disabled + .MuiFormControlLabel-label': {
                color: 'black',
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={!!selectedGroupRow.positiveReports}
                onChange={handleCheckboxChange('positiveReports')}
                disabled={!isEditable}
                sx={{ padding: '2px' }}  // ⬇️ reduced checkbox padding
              />
            }
            label="Positive Reporting"
            sx={{
              backgroundColor: 'white',
              pl: 1,
              mt: 0,
              mb: -1,
              lineHeight: 1,
              minHeight: '24px', // ⬇️ constrain overall height
              '& .MuiFormControlLabel-label': {
                fontSize: '0.78rem',
                color: 'black',
                paddingTop: '2px',
              },
              '& .Mui-disabled + .MuiFormControlLabel-label': {
                color: 'black',
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={!!selectedGroupRow.subClientInd}
                onChange={handleCheckboxChange('subClientInd')}
                disabled={!isEditable}
                sx={{ padding: '2px' }} // minimize checkbox spacing
              />
            }
            label="Sub Client"
            sx={{
              backgroundColor: 'white',
              pl: 1,
              mt: 0,                // reduce top margin
              mb: -1,                // reduce bottom margin
              '& .MuiFormControlLabel-label': {
                fontSize: '0.78rem',     // smaller label
                color: 'black',
                lineHeight: '1rem',
              },
              '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
            }}
          />

       <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={!!selectedGroupRow.excludeFromReport}
                onChange={handleCheckboxChange('excludeFromReport')}
                disabled={!isEditable}
                sx={{ padding: '2px' }} // minimize checkbox spacing
              />
            }
            label="Exclude From Postage Reports"
            sx={{
              backgroundColor: 'white',
              pl: 1,
              mt: 0,                // reduce top margin
              mb: -1,                // reduce bottom margin
              '& .MuiFormControlLabel-label': {
                fontSize: '0.78rem',     // smaller label
                color: 'black',
                lineHeight: '1rem',
              },
              '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={!!selectedGroupRow.amexIssued}
                onChange={handleCheckboxChange('amexIssued')}
                disabled={!isEditable}
                sx={{ padding: '2px' }}
              />
            }
            label="American Express Issued"
            sx={{
              backgroundColor: 'white',
              pl: 1,
              mt: '-4px',
              mb: '-4px',
              '& .MuiFormControlLabel-label': {
                fontSize: '0.78rem',
                color: 'black',
                lineHeight: '1rem',
              },
              '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
            }}
          />
    </Box>
  );
};

export default ClientInformationB;
