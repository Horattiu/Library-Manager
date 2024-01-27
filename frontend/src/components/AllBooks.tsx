import { useState } from "react";
import {
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
  Container,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useSWR, { mutate } from "swr";
import CustomModal from "./View";
import DeleteBook from "./DeleteBook";
import EditBook from "./EditBook";

export type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
};

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    background: {
      default: "#242424",
    },
    text: {
      primary: "#fff",
    },
  },
});

function AllBooks() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };

  const { data: books, error } = useSWR<Book[]>(
    "https://backend-librarymanager.onrender.com/books",
    fetcher
  );

  const handleDelete = async (bookId: number) => {
    try {
      await fetch(
        `https://backend-librarymanager.onrender.com/books/${bookId}`,
        {
          method: "DELETE",
        }
      );

      mutate("https://backend-librarymanager.onrender.com/books");
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  const handleEdit = async (editedBook: Book) => {
    console.log("Edited book:", editedBook);

    try {
      const url = `https://backend-librarymanager.onrender.com/books/${editedBook.id}`;
      console.log("Edit URL:", url); // Log the URL being used for the edit request

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

      console.log("Book successfully updated on the server");

      // Update the book in the UI
      mutate("https://backend-librarymanager.onrender.com/books");
      console.log("Books after edit:", books); // Log the updated books state

      setModalOpen(false);
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (error) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Error Loading Books
        </Typography>
        <Typography>{error.message}</Typography>
      </Container>
    );
  }

  if (!books) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  const handleView = (book: Book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "order",
      headerName: "",
      width: 70,
      renderCell: (params) => {
        const rowIndex = books.findIndex((book) => book.id === params.row.id);
        return rowIndex + 1;
      },
    },
    // { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "author", headerName: "Author", width: 130 },
    { field: "genre", headerName: "Genre", width: 90 },
    {
      field: "description",
      headerName: "Description",
      width: 160,
    },
    {
      field: "edit",
      headerName: "",
      width: 80,
      renderCell: (params) => (
        <EditBook
          book={params.row as Book}
          onEdit={(editedBook: Book) => handleEdit(editedBook)}
        />
      ),
    },
    {
      field: "view",
      headerName: "",
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => handleView(params.row)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },

    {
      field: "deleteS",
      headerName: "",
      width: 80,
      renderCell: (params) => (
        <DeleteBook
          bookId={params.row.id}
          onDelete={(bookId) => handleDelete(bookId)}
        />
      ),
    },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <div style={{ backgroundColor: "#242424", height: "100vh" }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Container
            sx={{
              height: 400,
              display: "flex",
              backgroundColor: "#242424",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <DataGrid
              rows={books}
              columns={columns}
              disableColumnFilter
              disableColumnMenu
              disableColumnSelector
              disableDensitySelector
              disableRowSelectionOnClick
            />

            <CustomModal
              open={modalOpen}
              onClose={handleCloseModal}
              selectedBook={selectedBook}
              children={undefined}
            />
          </Container>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default AllBooks;
