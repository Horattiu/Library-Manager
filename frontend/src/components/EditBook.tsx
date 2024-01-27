import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Book } from "./AllBooks";
import { useFormik } from "formik";
import * as Yup from "yup";

interface EditBookProps {
  book: Book;
  onEdit: (editedBook: Book) => void;
}

const EditBook: React.FC<EditBookProps> = ({ book, onEdit }) => {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      genre: Yup.string().required("Genre is required"),
      description: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);

      const editedBook = {
        ...book,
        title: values.title,
        author: values.author,
        genre: values.genre,
        description: values.description,
      };

      try {
        console.log("Submitting edited book:", editedBook);

        const url = `https://backend-librarymanager.onrender.com/books/${editedBook.id}`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedBook),
        });

        if (!response.ok) {
          throw new Error("Failed to update book");
        }

        const updatedBook = await response.json();
        onEdit(updatedBook);
        handleClose();
      } catch (error) {
        console.error("Error editing book:", error);
      }
    },
  });

  const handleOpen = () => {
    console.log("Opening dialog");
    setOpen(true);
  };

  const handleClose = () => {
    console.log("Closing dialog");
    setOpen(false);
  };

  const handleBookSelect = () => {
    console.log("Selected book:", book);
    handleOpen();
  };

  return (
    <>
      <IconButton onClick={handleBookSelect}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              margin="dense"
              id="author"
              name="author"
              label="Author"
              type="text"
              fullWidth
              value={formik.values.author}
              onChange={formik.handleChange}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
            />
            <TextField
              margin="dense"
              id="genre"
              name="genre"
              label="Genre"
              type="text"
              fullWidth
              value={formik.values.genre}
              onChange={formik.handleChange}
              error={formik.touched.genre && Boolean(formik.errors.genre)}
              helperText={formik.touched.genre && formik.errors.genre}
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditBook;
