// File: ClientEmailSetups.js
import React, { useState, useEffect } from 'react';

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

const ClientEmailSetups = ({ clientEmails, handleDeleteClick, selectedEmail, setSelectedEmail }) => {
  const selected = clientEmails.find(e => e.emailAddressTx === selectedEmail) || {};
  const [isEditable, setIsEditable] = useState(false);
  const [editableFields, setEditableFields] = useState({
    mailServerId: '',
    emailNameTx: '',
    activeFlag: false,
    carbonCopyFlag: false,
    emailAddressTx: ''
  });

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

  useEffect(() => {
    if (selectedEmail && selected.emailAddressTx) {
      setEditableFields({
        mailServerId: selected.mailServerId ?? '',
        emailNameTx: selected.emailNameTx ?? '',
        activeFlag: !!selected.activeFlag,
        carbonCopyFlag: !!selected.carbonCopyFlag,
        emailAddressTx: selected.emailAddressTx ?? ''
      });
    }
  }, [selectedEmail]);
  
  

  const handleSelectChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: '14px', fontFamily: 'Roboto, Helvetica, Arial' }}>
      <div>
        <label htmlFor="clientEmailList" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '6px', display: 'block' }}>
          Client Email Setup
        </label>
        <div style={{ fontWeight: 300, fontSize: '12px', color: '#6c757d', marginBottom: '6px' }}>
          Email Recipient
        </div>
        <select
          id="clientEmailList"
          size="4"
          value={selectedEmail}
          onChange={handleSelectChange}
          style={{
            width: '70%',
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
          }}
        >
          {clientEmails.map((email, index) => (
            <option key={index} value={email.emailAddressTx}>
              {email.emailAddressTx}
            </option>
          ))}
        </select>
      </div>

      <Box sx={{ display: 'flex', gap: 2 }}>
        

          {/* Row 3: Search Type */}
              <FormControl fullWidth size="small" sx={{ backgroundColor: 'white' }}>
                <InputLabel id="email-server-label" sx={labelSx}>Email Server</InputLabel>
                <Select
                  labelId="email-server-label"
                  id="email-server"
                  value={editableFields.mailServerId}
                  label="Email Server"
                  onChange={(e) => setEditableFields({ ...editableFields, mailServerId: e.target.value })}
                  disabled={!isEditable}
                  sx={sharedSx}
                >
               <MenuItem value="0">None</MenuItem>
            <MenuItem value="1">Omaha-SMTP Server (uschaappsmtp.1dc.com)</MenuItem>
            <MenuItem value="2">Cha-SMTP Server (uschaappsmtp.1dc.com)</MenuItem>
                </Select>
              </FormControl>


      <TextField
        label="Name"
        value={editableFields.emailNameTx}
        onChange={(e) => setEditableFields({ ...editableFields, emailNameTx: e.target.value })}
        size="small"
        fullWidth
        disabled={!isEditable}
        sx={sharedSx}
      />

      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              disabled={!isEditable}
              checked={editableFields.activeFlag}
              onChange={(e) => setEditableFields({ ...editableFields, activeFlag: e.target.checked })}
            />
          }
          label="Recipient Active"
          sx={{
            flex: 1,
            '.MuiFormControlLabel-label': {
              fontSize: '14px',
              color: 'black', // ✅ force label to be black
            },
            '&.Mui-disabled .MuiFormControlLabel-label': {
              color: 'black', // ✅ maintain black even when disabled
            },
          }}
        />
        
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={editableFields.carbonCopyFlag}
              onChange={(e) => setEditableFields({ ...editableFields, carbonCopyFlag: e.target.checked })}
              disabled={!isEditable}
            />
          }
          label="CC"
          sx={{
            flex: 1,
            '.MuiFormControlLabel-label': {
              fontSize: '14px',
              color: 'black', // ✅ force label to be black
            },
            '&.Mui-disabled .MuiFormControlLabel-label': {
              color: 'black', // ✅ maintain black even when disabled
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Email Address"
          variant="outlined"
          size="small"
          fullWidth
          disabled={!isEditable}
          value={editableFields.emailAddressTx}
          onChange={(e) => setEditableFields({ ...editableFields, emailAddressTx: e.target.value })}
          sx={{
            backgroundColor: 'white',
            fontSize: '14px',
            '& .MuiInputBase-input.Mui-disabled': {
              color: 'black',
              WebkitTextFillColor: 'black',
            },
            '& .MuiInputLabel-root.Mui-disabled': {
              color: 'black',
            },
          }}
        />
        <TextField
          label="Selected"
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
          disabled
          sx={{
            backgroundColor: 'white',
            fontSize: '14px',
            '& .MuiInputBase-input.Mui-disabled': {
              color: 'black',
              WebkitTextFillColor: 'black',
            },
            '& .MuiInputLabel-root.Mui-disabled': {
              color: 'black',
            },
          }}
        />
      </Box>

      <hr style={{ border: 'none', borderTop: '1px solid black', marginTop: '12px', marginBottom: '2px' }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <button
          onClick={() => {
            setIsEditable(true);
            setSelectedEmail('');
            setEditableFields({
              mailServerId: '',
              emailNameTx: '',
              activeFlag: false,
              carbonCopyFlag: false,
              emailAddressTx: '',
            });
          }}
          
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            marginRight: '16px',
          }}
        >
          <ClearIcon style={{ fontSize: '35px', color: 'gray' }} />
        </button>

        <button
          onClick={handleDeleteClick}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            marginRight: '16px',
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
          New Email
        </button>
      </Box>
    </Box>
  );
};

export default ClientEmailSetups;
