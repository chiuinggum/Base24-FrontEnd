import * as React from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonsMultiple(props) {
    const {
        setMapId,
        setFocusIsChecked,
        setDetailsIsChecked,
        setPencilIsChecked,
        setPathsIsChecked
    } = props;
    const [formats, setFormats] = React.useState([]);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
        // console.log(newFormats);
        if (newFormats.includes('focus')) {
            setMapId(process.env.NEXT_PUBLIC_MAP_ID_SILVER);
            setFocusIsChecked(true);
        } else {
            setMapId(process.env.NEXT_PUBLIC_MAP_ID_LIGHT);
            setFocusIsChecked(false);
        }
        if (newFormats.includes('details')) {
            setDetailsIsChecked(true);
        } else {
            setDetailsIsChecked(false);
        }
        if (newFormats.includes('pencil')) {
            setPencilIsChecked(true);
        } else {
            setPencilIsChecked(false);
        }
        if (newFormats.includes('paths')) {
            setPathsIsChecked(true);
        } else {
            setPathsIsChecked(false);
        }
    };

    return (
        <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
            sx={{ width: '100%', justifyContent: 'center', margin: '2rem auto'}}
            >
            <ToggleButton value="focus" aria-label="focus" sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', padding: "6px 12px", borderRadius: " 20px 0 0 20px" }}>
                Focus
            </ToggleButton>
            <ToggleButton value="pencil" aria-label="pencil"  sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', padding: "6px 12px" }}>
                Pencil
            </ToggleButton>
            <ToggleButton value="details" aria-label="details" sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', padding: "6px 12px" }}>
                Details
            </ToggleButton>
            <ToggleButton value="paths" aria-label="paths" sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', padding: "6px 12px", borderRadius: " 0 20px 20px 0 " }}>
                Paths
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
