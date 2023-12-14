import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function DateTagsFilter (props) {
    const {
        setDateFilter,
        map_id
    } = props;
    const [dates, setDates] = React.useState([]);
    const [tag, setTag] = React.useState('');

    const handleChange = (event) => {
        if (event.target.value === 'null') setDateFilter(null);
        else setDateFilter(event.target.value);
        setTag(event.target.value);
    };

    React.useEffect(() => {
        const fetchDates = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_MAPS_URL}/get/dates/${map_id}`);
            const data = response.data.data;
            setDates(data);
        }
        fetchDates();
    }, []);


    return (
    
    <FormControl sx={{ m: 1, minWidth: "100%", margin: 0 }} size="small">
        
    <InputLabel id="demo-select-small-label" sx={{ margin: "0.3rem 0.55rem", color: "#999"}}>View with a Date Tag</InputLabel>
    <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={tag}
        label="Tag"
        onChange={handleChange}
        sx={{ border: '1px solid #bbb', borderRadius: '5rem', margin: '0.3rem  0.55rem'  }}
    >
    <MenuItem value='null'>
        <em>None</em>
    </MenuItem>
    {dates.map((date) => (
        <MenuItem key={date} value={date}>{date}</MenuItem>
    ))}
    </Select>
    </FormControl>
    );
};