import * as React from 'react';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function SelectPlaceTag(props) {
    const {
        markers,
        markerClicked,

        saveClicked,
        setSaveClicked
    } = props
    const [tag, setTag] = useState('');
    const handleChange = (event) => {
        setTag(event.target.value);
    }

    useEffect(() => {
        setTag(markers.find((marker) => marker.id === markerClicked).place_tag);
    }, [markerClicked]);

    useEffect(() => {
        if (!markerClicked) return;

        const updatePlaceTag = async () => {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_MARKERS_URL}/update/place_tag`,
                {
                    id: markerClicked,
                    place_tag: tag
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
        }

        if (saveClicked) {
            // update the place tag in the markers array
            markers.forEach((marker) => {
                if (marker.id === markerClicked) {
                    marker.place_tag = tag;
                }
            })
            // update the place tag in the database
            updatePlaceTag();
            setSaveClicked(false);
        }
    }, [saveClicked]);

    return (
    <FormControl sx={{ m: 1, minWidth: '95%' }} size="small">
        <InputLabel id="demo-select-small-label" >Select a Place Tag</InputLabel>
        <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={tag}
            label="tag"
            onChange={handleChange}
            sx={{ border: '1px solid #bbb', borderRadius: '5rem', margin: '0.3rem  0.55rem'  }}
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