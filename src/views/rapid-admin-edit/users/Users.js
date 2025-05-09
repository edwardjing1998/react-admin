import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const ClientAutoComplete = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue.trim() !== '') {
        fetch(`http://localhost:4444/api/client-autocomplete?keyword=${inputValue}`)
          .then(res => res.json())
          .then(data => setOptions(data))
          .catch(err => console.error('Autocomplete fetch error:', err));
      } else {
        setOptions([]);
      }
    }, 300); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options.map(opt => `${opt.client} - ${opt.name}`)}
      onInputChange={(event, value) => setInputValue(value)}
      onChange={(event, newValue) => setSelectedValue(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Client"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          fullWidth
        />
      )}
    />
  );
};

export default ClientAutoComplete;
