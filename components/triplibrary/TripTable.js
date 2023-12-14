import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Link } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { setCookie } from 'nookies';

function createData(id, name, startDate, endDate, maps) {
  return {
    id,
    name,
    startDate: startDate.replace(/-/g, "/"),
    endDate: endDate.replace(/-/g, "/"),
    maps: maps.map((map) => {
      return {
        id: map.id,
        name: map.name,
        location: map.location,
        start_date: map.start_date,
        end_date: map.end_date,
      }
    })
    // maps: [
    //   {
    //     name: "Paris Map",
    //   }
    // ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log(row);


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.startDate}</TableCell>
        <TableCell align="right">{row.endDate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Maps
                <Link href={`/createmap`} onClick={setCookie(null, 'trip_id', row.id, { path: '/' })}>
                <LibraryAddIcon/>
                </Link>
              </Typography>
              
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.maps.map((mapRow) => (
                    // console.log(mapRow),
                    <TableRow key={mapRow.id}>
                      
                      <TableCell component="th" scope="row">
                        {mapRow.id}
                      </TableCell>
                      
                        <TableCell component="th" scope="row" >
                          <Link href={`/map/${mapRow.id}`} className='no-underline'>
                          {mapRow.name}
                          </Link>
                        </TableCell>
                      
                      <TableCell component="th" scope="row">
                        {mapRow.location}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {mapRow.start_date}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {mapRow.end_date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Paris Trip', '2021-10-01', '2021-10-10'),
//     createData('Lyon Trip', '2021-11-01', '2021-11-10'),
//     createData('Marseille Trip', '2021-12-01', '2021-12-10'),
//     createData('Nice Trip', '2022-01-01', '2022-01-10'),
//     createData('Toulouse Trip', '2022-02-01', '2022-02-10'),
//     createData('Montpellier Trip', '2022-03-01', '2022-03-10'),
// ];

export default function TripTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // if(cookies?.user_id == undefined) return;
    const user_id = parseCookies().user_id;
    let temp = [];
    const fetchTrips = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_TRIPS_URL}/${user_id}`);
      const data = response.data.data;
      data.forEach((trip) => {
        const row = createData(trip.id, trip.name, trip.start_date, trip.end_date, trip.maps);
        console.log(row);
        temp.push(row);
      })
      setRows(temp);
    }
    fetchTrips();
  }, []);

  // if (!rows) return (<div>loading...</div>)
  
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "16px"}}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: "#0369a1"}}>
          <TableRow>
            <TableCell />
            <TableCell sx={{ color: "white" }}>Trip Name</TableCell>
            <TableCell sx={{ color: "white" }} align="right">Start Date</TableCell>
            <TableCell sx={{ color: "white" }} align="right">End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}