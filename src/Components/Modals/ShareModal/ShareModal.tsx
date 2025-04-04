import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { usePost } from "../../../store/PostContext";
type Props = {
  open: boolean;
};
const ShareModal = ({ open }: Props) => {
  const { setIsShareModalOpened } = usePost();
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          We very appreciate that you really enjoy our app. However, some
          features haven't been applied now.
        </DialogContentText>
        <DialogContentText>Thank You</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsShareModalOpened(false)}>Good</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareModal;
