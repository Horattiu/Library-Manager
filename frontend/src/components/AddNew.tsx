import { useState } from "react";
import {
  createTheme,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
  Snackbar,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { mutate } from "swr";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MyCustomIcon from "../assets/add.png";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#242424",
    },
    text: {
      primary: "#fff",
      secondary: "#aaa",
    },
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#1976D2",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#212121",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: "#1976d2",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

interface FormValues {
  title: string;
  author: string;
  genre: string;
  description: string;
}

const BookSubmissionForm = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
    } as FormValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      genre: Yup.string().required("Genre is required"),
      description: Yup.string(),
    }),
    onSubmit: async (values: FormValues) => {
      try {
        const response = await fetch("https://backend-librarymanager.onrender.com/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          formik.resetForm();
          setSubmitSuccess(true);

          console.log("Before mutate"); // Log before mutate
          mutate("http://localhost:3001/books"); // Trigger SWR to revalidate data
          console.log(mutate); // Log after  mutate
        } else {
          console.error(
            "Failed to submit book",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error submitting book:", error);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            gap: 8,

            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              marginBottom: { sm: -4, md: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            Add new book
            <img
              src={MyCustomIcon}
              alt="Custom Icon"
              style={{
                margin: 10,
                width: 90,
              }}
            />
          </Typography>

          <form onSubmit={formik.handleSubmit} noValidate>
            <Grid
              container
              sx={{
                width: {
                  xs: "90%",
                  md: "24rem",
                },
                display: "flex",
                rowGap: 2,
                justifyContent: "center",
                margin: "auto",
              }}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoFocus
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor:
                        formik.touched.title && Boolean(formik.errors.title)
                          ? "red"
                          : undefined,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="author"
                  label="Author"
                  name="author"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                  error={formik.touched.author && Boolean(formik.errors.author)}
                  helperText={formik.touched.author && formik.errors.author}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor:
                        formik.touched.author && Boolean(formik.errors.author)
                          ? "red"
                          : undefined,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="genre"
                  label="Genre"
                  name="genre"
                  value={formik.values.genre}
                  onChange={formik.handleChange}
                  error={formik.touched.genre && Boolean(formik.errors.genre)}
                  helperText={formik.touched.genre && formik.errors.genre}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor:
                        formik.touched.genre && Boolean(formik.errors.genre)
                          ? "red"
                          : undefined,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#1976d2",
                color: "white",
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              Submit
            </Button>
            <Snackbar
              open={submitSuccess}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              message="Book submitted successfully"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleCloseSnackbar}
                >
                  <CheckCircleIcon fontSize="small" />
                </Button>
              }
            />
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default BookSubmissionForm;
