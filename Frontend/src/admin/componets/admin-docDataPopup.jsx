import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import { height } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '54vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function AdminDocPopUp({ imageUrls, onClose }) {
    return (
        <div>
            <Modal
                open={Boolean(imageUrls)}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {imageUrls && imageUrls.map((imageUrl, index) => (
                            <div key={index} style={{ flex: '0 0 49%', textAlign: 'center',border:'solid black 1px',padding:'5px' }}>
                                <img src={imageUrl} alt={`Selected Image ${index}`} style={{ maxWidth: '100%', height: 'auto' }} />
                            </div>
                        ))}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

AdminDocPopUp.propTypes = {
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    onClose: PropTypes.func.isRequired,
};