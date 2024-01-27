import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Book } from "./AllBooks";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  selectedBook: Book | null;
}
const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  selectedBook,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>details</DialogTitle>
      <DialogContent>
        <TextField
          variant="standard"
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          value={selectedBook?.title}
          disabled
          InputProps={{ disableUnderline: true }}
        />
        <TextField
          variant="standard"
          margin="dense"
          id="author"
          label="Author"
          type="text"
          fullWidth
          value={selectedBook?.author}
          disabled
          InputProps={{ disableUnderline: true }}
        />
        <TextField
          variant="standard"
          margin="dense"
          id="genre"
          label="Genre"
          type="text"
          fullWidth
          value={selectedBook?.genre}
          disabled
          InputProps={{ disableUnderline: true }}
        />
        <TextField
          variant="standard"
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={selectedBook?.description}
          disabled
          InputProps={{ disableUnderline: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {/* <Button onClick={handleEdit} color="primary">
          Edit
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
