 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function AdminDocPopUp({ imageURL, onClose }) {
    return (
        <div>
            <Modal
                open={Boolean(imageURL)}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img src={imageURL} alt="Selected Image" />
                    <Button onClick={onClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}
