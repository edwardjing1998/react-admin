import React, { useState, useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Popper from '@mui/material/Popper';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

  const ClientAutoComplete = ({ inputValue, setInputValue, onClientsFetched, isWildcardMode, setIsWildcardMode }) => {

  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const keywordRef = useRef('');

  const CustomPopper = function (props) {
    return <Popper {...props} modifiers={[{ name: 'offset', options: { offset: [0, 4] } }]} 
      style={{ width: 400 }} 
    />;
  };
  

  useEffect(() => {
      console.log("🔥 isWildcardMode changed:", isWildcardMode);
      if(!isWildcardMode){
        setInputValue('');
        console.log("🔥 InputValue is empty", inputValue);
      }     
    }, [isWildcardMode]);

  // Debounced fetch on input change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = inputValue.trim();
      if (trimmed !== '') {
        const isWildcard = trimmed.endsWith('*');
        setIsWildcardMode?.(isWildcard);
        const keyword = encodeURIComponent(trimmed);
        keywordRef.current = keyword;

        const endpoint = isWildcard
          ? `http://localhost:4444/api/client/wildcard?keyword=${keyword}`
          : `http://localhost:4444/api/client-autocomplete?keyword=${keyword}`;

        fetch(endpoint)
          .then((res) => res.json())
          .then((data) => {
            const clientData = data.data || data;
            setOptions(clientData);
            if (isWildcard && typeof onClientsFetched === 'function' && data != "") {
              onClientsFetched(clientData);
            }
          })
          .catch((err) => {
            console.error('Autocomplete fetch error:', err);
            setOptions([]);
          });
      } else {
        setOptions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, onClientsFetched]);

  return (
    <Autocomplete
      inputValue={inputValue} 
      freeSolo
      disableClearable
      fullWidth
      options={options.map(opt =>
        typeof opt === 'object' && opt.client && opt.name
          ? `${opt.client} - ${opt.name}`
          : ''
      ).filter(Boolean)}
      onInputChange={(event, value) => setInputValue(value)}
      onChange={(event, newValue) => setSelectedValue(newValue)}
      PopperComponent={CustomPopper}
      slotProps={{
        paper: {
          sx: {
            fontSize: '0.78rem', // ✅ Apply font size here
            width: 300,
          },
        },
        listbox: {
          sx: {
            fontSize: '0.78rem', // ✅ Also good for extra control
          },
        }
      }}
      sx={{ width: '100%', backgroundColor: '#fff' }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Client"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ fontSize: 18, color: '#555' }} />
              </InputAdornment>
            ),
            sx: {
              height: 36,
              padding: '0 8px',
              fontSize: '0.875rem',
              backgroundColor: '#fff',
              boxShadow: 'none',
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid black',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: '1px solid black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '1px solid black',
              },
            }
          }}
        />
      )}
      
    />
  );
};

export default ClientAutoComplete;
