import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import NewItemPage from "./pages/NewItemPage";
import EditPage from "./pages/EditPage";

import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<DetailsPage />} />
          <Route path="/sell" element={<NewItemPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
