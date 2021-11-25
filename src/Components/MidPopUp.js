import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #6E6A6A",
  boxShadow: 24,
  p: 4,
};

function MidPopUp(props) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOk = () => setOpen(false);

    return (
      <div>
        <Button onClick={handleOpen}>Update</Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description" align="center" >
          <Box sx={style} >
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ m: 5 }}>
              {props.message}
              {/* Records have been updated Successfully! */}
            </Typography>
            <Button onClick={handleOk} variant="contained" color="primary" >Ok</Button>
          </Box>
        </Modal>
      </div>
    );
}

export default MidPopUp
