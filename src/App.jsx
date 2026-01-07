import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import NewItemPage from "./pages/NewItemPage";
import EditPage from "./pages/EditPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  //  FAVORITES STATE (GLOBAL)
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleFavoritesClick = () => {
    setShowFavorites((prev) => !prev);
  };

  return (
    <>
      <Navbar
        showFavorites={showFavorites}
        onFavoritesClick={handleFavoritesClick}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                favoriteIds={favoriteIds}
                setFavoriteIds={setFavoriteIds}
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
              />
            }
          />
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
