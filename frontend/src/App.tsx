import { Route, Routes } from "react-router-dom";
import AddNew from "./components/AddNew";
import Navbar from "./components/Navbar";
import AllBooks from "./components/AllBooks";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllBooks />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/add-new" element={<AddNew />} />
      </Routes>
    </>
  );
}

export default App;
