import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../assets/placeholder.png"; //fallback
import { getFavoriteIds, toggleFavorite } from "../components/Favorites";

// Backend endpoint (json-server)
const API_URL = "http://localhost:5005/products";

const PRODUCTS_PER_PAGE = 12;

function HomePage({
  favoriteIds,
  setFavoriteIds,
  showFavorites,
  setShowFavorites,
}) {
  // STATE MANAGEMENT

  // Stores the list of products fetched from the API
  const [products, setProducts] = useState([]);
  // Stores the selected sorting option (A–Z, price, etc.)
  const [sortOption, setSortOption] = useState("");

  // Loading and error handling states
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Favorites (with localStorage)

  const prevFavCount = useRef(0);
  const [favNotice, setFavNotice] = useState("");
  const favTimeoutRef = useRef(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // DATA FETCHING

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const favs = getFavoriteIds();
    setFavoriteIds(favs);
    prevFavCount.current = favs.length;
  }, [setFavoriteIds]);

  // Cleanup timeout (in case user navigates away before it clears)
  useEffect(() => {
    return () => {
      if (favTimeoutRef.current) {
        clearTimeout(favTimeoutRef.current);
        favTimeoutRef.current = null;
      }
    };
  }, []);

  // Reset to page 1 whenever filters/sort/search or mode changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    categoryFilter,
    conditionFilter,
    statusFilter,
    sortOption,
    showFavorites,
  ]);

  useEffect(() => {
    // If favorites become empty while in Favorites mode, switch back to All products
    if (showFavorites && prevFavCount.current > 0 && favoriteIds.length === 0) {
      setShowFavorites(false);
      setCurrentPage(1);
      setFavNotice("");

      if (favTimeoutRef.current) {
        clearTimeout(favTimeoutRef.current);
        favTimeoutRef.current = null;
      }
    }

    prevFavCount.current = favoriteIds.length;
  }, [showFavorites, favoriteIds]);

  // SORT HANDLER

  // Updates the selected sorting option
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // FILTERING & SORTING LOGIC

  // Build condition options from the fetched products
  const CONDITIONS = [
    "New",
    "Used - Excellent",
    "Used - Very Good",
    "Used - Good",
  ];

  const CATEGORIES = [
    "Accessories",
    "Audio",
    "Computers",
    "Electronics",
    "Home",
    "Home Entertainment",
    "Mobile Phones",
    "Networking",
    "Photography",
    "Storage",
    "Tablets",
    "Transport",
    "Video Games",
    "Wearables",
  ];

  // Favorites toggle handler
  const handleToggleFavorite = (id) => {
    const next = toggleFavorite(id);
    setFavoriteIds(next);
  };

  // Decide which base list are displayed (all products or only favorites)
  const baseProducts = showFavorites
    ? products.filter((p) => favoriteIds.includes(String(p.id)))
    : products;

  // Derived list (filters products based on search, category, and condition & sorts the filtered results according to the selected sort option)
  const visibleProducts = [...baseProducts]
    .filter((p) => {
      const matchesSearch = (p.title ?? "")
        .toLowerCase()
        .includes((searchTerm ?? "").toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;

      const matchesCondition =
        conditionFilter === "all" || p.condition === conditionFilter;

      const status = p.status ?? "available";

      const matchesStatus = statusFilter === "all" || status === statusFilter;

      return (
        matchesSearch && matchesCategory && matchesCondition && matchesStatus
      );
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "az":
          return (a.title ?? "").localeCompare(b.title ?? "");
        case "za":
          return (b.title ?? "").localeCompare(a.title ?? "");
        case "price-asc":
          return (a.price ?? 0) - (b.price ?? 0);
        case "price-desc":
          return (b.price ?? 0) - (a.price ?? 0);
        case "recent":
          return (b.id ?? 0) - (a.id ?? 0);
        case "old":
          return (a.id ?? 0) - (b.id ?? 0);
        default:
          return 0;
      }
    });

  // Pagination calculations (applies after filtering/sorting)
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;

  const paginatedProducts = visibleProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE);

  // EARLY RETURNS (for when the app is still loading data or if an error occurs during the fetch process)
  if (isLoading) return <p>Loading products...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;

  // RENDER (data has already been fetched, filtered, and sorted into visibleProducts)
  // Displays the UI and renders the final list of products based on the current filters and sorting options
  return (
    <div>
      <div className="products-header">
        <h1>Products</h1>

        <div className="filters-bar">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
          >
            <option value="all">All conditions</option>
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>

          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="recent">Most recent</option>
            <option value="old">Oldest</option>
          </select>
        </div>
      </div>
      {visibleProducts.length === 0 ? (
        <p>
          {showFavorites
            ? favoriteIds.length === 0
              ? "No favorites yet."
              : "No favorites match your filters."
            : "No products found."}
        </p>
      ) : (
        <>
          <ul className="products-grid">
            {paginatedProducts.map((p) => {
              const status = p.status ?? "available";
              const statusLabel = status[0].toUpperCase() + status.slice(1);
              const isFav = favoriteIds.includes(String(p.id));
              return (
                <li key={p.id} className="product-card">
                  <div className="image-wrapper">
                    <img
                      src={p.imgUrl?.trim() ? p.imgUrl : placeholderImg}
                      alt={p.title}
                      className="product-img"
                    />

                    <span className={`badge ${status}`}>{statusLabel}</span>

                    <button
                      className={`fav-btn ${isFav ? "active" : ""}`}
                      onClick={() => handleToggleFavorite(p.id)}
                      aria-label="Toggle favorite"
                    >
                      ♥
                    </button>
                  </div>

                  <div className="card-content">
                    <h3 className="title">{p.title}</h3>
                    <p className="condition">{p.condition}</p>
                    <p className="price">{p.price} €</p>
                  </div>

                  <div className="card-actions">
                    <button
                      className="btn-primary"
                      onClick={() => navigate(`/product/${p.id}`)}
                    >
                      Details
                    </button>

                    <button
                      className="btn-secondary"
                      onClick={() => navigate(`/edit/${p.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
