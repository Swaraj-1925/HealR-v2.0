// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AdminDocPopUp from './admin-docPopup';
import { useState } from 'react';

// Sample data
const sample = [
  ['John Doe', 5],
  ['Jane Smith', 8],
  ['Bob Johnson', 3],
];

function createData(name, experience) {
  return { name, experience };
}

// eslint-disable-next-line no-unused-vars
const rows = sample.map((item, index) => createData(item[0], item[1]));

export default function CustomizedTable() {
  const [seen, setSeen] = useState(false)
  useState
  function togglePop() {
    setSeen(!seen);
  }

  // code to show relative data as name
  // usestae to change set name of doctor to rtrive realted data from server
  // stored the values in a constant and pass it to admin-docpop componet
  

  return (
    <TableContainer component={Paper} style={{ width: '90%', margin: '5vw' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Experience (Years)</TableCell>
            <TableCell align="center" colSpan={2}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" onClick={togglePop}>
                {row.name}
                {seen ? <AdminDocPopUp toggle={togglePop} /> : null}
                {seen && <div className="overlay"></div>}
              </TableCell>
              <TableCell align="right">{row.experience}</TableCell>
              <TableCell align="center" style={{ padding: '8px 4px' }}>
                <Button variant="contained" color="primary" onClick={() => handleAccept(row)}>
                  Accept
                </Button>
                <Button style={{ margin: '5px' }} variant="contained" color="secondary" onClick={() => handleSendBack(row)}>
                  Send Back
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Define event handlers for buttons
function handleAccept(row) {
  console.log(`Accepted: ${row.name}`);
}

function handleSendBack(row) {
  console.log(`Sent back: ${row.name}`);
}
