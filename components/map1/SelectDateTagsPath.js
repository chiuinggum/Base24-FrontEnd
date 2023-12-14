import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(date, dateName, theme) {
    return {
      fontWeight:
        dateName.indexOf(date) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }  

export default function SelectDateTagsPath (props) {
    const {
        pathClicked,
        map_id,
        saveClicked,
        setSaveClicked
    } = props;
    const theme = useTheme();
    const [dates, setDates] = React.useState([]);
    const [dateName, setDateName] = React.useState([]);

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setDateName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        const fetchDateName = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DATES_URL}/get/path/${pathClicked}`);
            const data = response.data.data;
            console.log(data);
            setDateName(data);
        }
        fetchDateName();
    }, [pathClicked]);

    useEffect(() => {
        const fetchDates = async () => {
            console.log(map_id, 'map_id');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_MAPS_URL}/get/dates/${map_id}`);
            const data = response.data.data;
            console.log(data);
            setDates(data);
        }
        fetchDates();
    }, [])

    useEffect(() => {
        if (!saveClicked) return;
        const updatePathDates = async () => {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_DATES_URL}/update/paths`,
                {
                    dates: dates,
                    dateName: dateName,
                    path_id: pathClicked
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            console.log(response);
        }
        updatePathDates();
    }, [saveClicked])

    return (
        <div>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label" sx={{ margin: "0.3rem 0.55rem", color: "#999"}}>Select Dates</InputLabel>
            <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={dateName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            sx={{ border: '1px solid #bbb', borderRadius: '5rem', margin: '0.3rem  0.55rem'  }}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                    <Chip key={value} label={value} />
                ))}
                </Box>
            )}
            MenuProps={MenuProps}
            >
            {dates.map((date) => (
                <MenuItem
                key={date}
                value={date}
                style={getStyles(date, dateName, theme)}
                >
                {date}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    );
}