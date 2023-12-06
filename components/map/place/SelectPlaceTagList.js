import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectPlaceTagList() {
  const [tag, setTag] = React.useState('');

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Select a Place Tag</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={tag}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem>airport</MenuItem>
        <MenuItem>station</MenuItem>
        <MenuItem>banking</MenuItem>
        <MenuItem>museum / gallery</MenuItem>
        <MenuItem>dessert</MenuItem>
        <MenuItem>cafe</MenuItem>
        <MenuItem>temple</MenuItem>
        <MenuItem>bar / club</MenuItem>
        <MenuItem>zoo</MenuItem>
        <MenuItem>gym</MenuItem>
        <MenuItem>health</MenuItem>
        <MenuItem>hotel</MenuItem>
        <MenuItem>nature</MenuItem>
        <MenuItem>park</MenuItem>
        <MenuItem>store</MenuItem>
        <MenuItem>mall</MenuItem>
        <MenuItem>restaurant</MenuItem>
        <MenuItem>show</MenuItem>
        <MenuItem>photo</MenuItem>
        <MenuItem>book</MenuItem>
        <MenuItem>school</MenuItem>
        <MenuItem>other</MenuItem>
      </Select>
    </FormControl>
  );
}