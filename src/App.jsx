// import { useState } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import NewItemPage from "./pages/NewItemPage";
import EditPage from "./pages/EditPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<DetailsPage />} />
          <Route path="/sell" element={<NewItemPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
