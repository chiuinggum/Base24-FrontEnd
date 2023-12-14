import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ViewPlaceTagList() {
  const [tag, setTag] = React.useState('');

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">View with a Place Tag</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={tag}
        label="Tag"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="airport">airport</MenuItem>
        <MenuItem value="bakery">bakery</MenuItem>
        <MenuItem value="bar">bar/club</MenuItem>
        <MenuItem value="beach">beach</MenuItem>
        <MenuItem value="bicycle">bicycle</MenuItem>
        <MenuItem value="book">bookstore/library</MenuItem>
        <MenuItem value="banking">banking</MenuItem>
        <MenuItem value="cafe">cafe</MenuItem>
        <MenuItem value="church">church</MenuItem>
        <MenuItem value="dessert">dessert</MenuItem>
        <MenuItem value="health">health</MenuItem>
        <MenuItem value="hotel">hotel</MenuItem>
        <MenuItem value="mall">mall</MenuItem>
        <MenuItem value="museum">museum/gallery</MenuItem>
        <MenuItem value="nature">nature</MenuItem>
        <MenuItem value="other">other</MenuItem>
        <MenuItem value="photo">photo</MenuItem>
        <MenuItem value="restaurant">restaurant</MenuItem>
        <MenuItem value="school">school</MenuItem>
        <MenuItem value="show">show</MenuItem>
        <MenuItem value="sports">sports</MenuItem>
        <MenuItem value="station">station</MenuItem>
        <MenuItem value="store">store</MenuItem>
        <MenuItem value="taxi">taxi</MenuItem>
        <MenuItem value="temple">temple</MenuItem>
        <MenuItem value="toilet">toilet</MenuItem>
        <MenuItem value="zoo">zoo</MenuItem>
      </Select>
    </FormControl>
  );
}