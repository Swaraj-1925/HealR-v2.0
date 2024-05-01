import { useState, useEffect } from 'react';
import axios from 'axios';

import AdminDocPopUp from './admin-docPopup';
import RejectPopup from './admin-rejeactPopup.jsx'; // Corrected import statement

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
 

export default function CustomizedTable() {
  const [rows, setRows] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Define selectedUser state

  useEffect(() => {
    // Make GET request to fetch data
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/docverication');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
const handleUsernameClick = (row) => {
  console.log(row.experienceProof);
  const imageUrls = [row.document, row.experienceProof, row.professionProof].filter(url => url); // Filter out null or undefined URLs
    setSelectedImage(imageUrls);
};

  const handleClosePopUp = () => {
    setSelectedImage(null);
  };

  const handleAccept = async (row) => {
    
    const username = row.username;

    try {
      const response = await axios.put('http://localhost:3000/admin/acceptReq', { username });
      console.log(response);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      alert("Error has occurred! Try again");
      console.error('Error updating data:', error);
    }
  };

  const handleSendBack = (row) => {
    setSelectedUser(row.username);
    setShowRejectPopup(true);
  };

  return (
    <TableContainer component={Paper} style={{ width: '90%', margin: '5vw' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Profession</TableCell>
            <TableCell align="center" colSpan={2}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <button onClick={() => handleUsernameClick(row)}>{row.username}</button>
              </TableCell>
              <TableCell align="right">{row.profession}</TableCell>
              <TableCell align="center" style={{ padding: '8px 4px' }}>
                <Button variant="contained" color="info" onClick={() => handleAccept(row)}>
                  Accept
                </Button>
                <Button style={{ margin: '5px' }} variant="contained" color="error" onClick={() => handleSendBack(row)}>
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedImage && <AdminDocPopUp imageUrls={selectedImage} onClose={handleClosePopUp} />}
      {showRejectPopup && <RejectPopup onClose={() => setShowRejectPopup(false)} selectedUser={selectedUser} />} {/* Pass selectedUser to RejectPopup */}
    </TableContainer>
  );
}