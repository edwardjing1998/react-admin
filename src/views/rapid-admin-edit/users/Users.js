import React from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const MultiSelectExample = () => {
  const [selectedValues, setSelectedValues] = React.useState([])

  const handleChange = (event) => {
    setSelectedValues(event.target.value)
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="multi-select-label">Select Options</InputLabel>
      <Select
        labelId="multi-select-label"
        multiple
        value={selectedValues}
        onChange={handleChange}
        style={{ fontSize: '0.97rem', height: '100%' }}
        label="Select Options"
      >
        <MenuItem value="1">123456</MenuItem>
        <MenuItem value="2">1234567</MenuItem>
        <MenuItem value="3">12345678</MenuItem>
        <MenuItem value="4">123456</MenuItem>
        <MenuItem value="5">1234567</MenuItem>
        <MenuItem value="6">12345678</MenuItem>
        <MenuItem value="7">123456</MenuItem>
        <MenuItem value="8">1234567</MenuItem>
        <MenuItem value="9">12345678</MenuItem>
      </Select>
    </FormControl>
  )
}

export default MultiSelectExample
