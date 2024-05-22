import { Backdrop, Button, Fade, Modal, Typography } from "@mui/material";
import { Box, width } from "@mui/system";
import React from "react";

const AddProfileImageModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#1976d2",
    color: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Successfully added profile
          </Typography>
          <Button variant={"outlined"} onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddProfileImageModal;
