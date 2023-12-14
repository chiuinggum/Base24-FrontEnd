import * as React from 'react';
import { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function SelectPlaceTagList(props) {
  const {
    markers,
    setMarkers,
    index,
    markerClicked
  } = props;
  const [tag, setTag] = React.useState('');

  useEffect(() => {
    if (!index) return;
  }, [index]);

  const handleChange = async (event) => {
    setTag(event.target.value);
    console.log(event.target.value);
    console.log(markerClicked.id);
    try {
      // const res = await axios.get(
      //   'http://localhost:4000/marker/id',
      //   { "marker_info_id": markerClicked.id },
      //   { headers: { 'Content-Type': 'application/json' } }
      // )
      // const id = res.data.data.id;
      const response = await axios.put(
        'http://localhost:4000/marker/placetag',
        {
          // "map_id": index,
          "marker_id": markerClicked.id,
          "place_tag": event.target.value
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      setMarkers(() => {
        const newMarkers = [...markers];
        console.log(newMarkers);
        newMarkers.forEach((marker) => {
          if (marker.id === markerClicked.id) {
            marker.place_tag = event.target.value;
          }
        })
        return newMarkers;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Select a Place Tag</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={tag}
        label="tag"
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