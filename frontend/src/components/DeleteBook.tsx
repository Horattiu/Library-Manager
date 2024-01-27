import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { mutate } from "swr";

interface DeleteBookProps {
  bookId: number;
  onDelete: (bookId: number) => void;
}

const DeleteBook: React.FC<DeleteBookProps> = ({ bookId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Make an API request to delete the book with the given bookId
      await fetch(`https://backend-librarymanager.onrender.com/${bookId}`, {
        method: "DELETE",
      });

      // Optionally, you can refresh the data after deletion
      mutate("hthttps://backend-librarymanager.onrender.com/books");

      // Call the onDelete callback to notify the parent component
      onDelete(bookId);
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label=""
        onClick={handleDelete}
        onDelete={handleDelete} // Corrected onDelete prop
        deleteIcon={<DeleteIcon style={{ marginRight: 14 }} />}
        variant="outlined"
      />
    </Stack>
  );
};

export default DeleteBook;
