import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// eslint-disable-next-line react/prop-types
export default function RejeactPopup({ onClose, selectedUser }) {
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.put('http://localhost:3000/admin/rejectReq', { username: selectedUser, description });
       
            if (response.status === 200) {
                alert("Successful!!")
                onClose();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    const handleCancel = () => {
        // Close the popup without sending any description
        onClose();
    };

    return (
        <Modal
            keepMounted
            open={true} // Always open the popup when it's rendered
            onClose={onClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    Reject Request
                </Typography>
                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    <textarea
                        placeholder="Enter your description here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', minHeight: '100px' }}
                    />
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Send
                    </Button>
                    <Button variant="contained" color="error" onClick={handleCancel} style={{ marginLeft: '10px' }}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
