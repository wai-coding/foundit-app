import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../assets/placeholder.png"; //fallback

// Backend endpoint (json-server)
const API_URL = "http://localhost:5005/products";

function HomePage() {
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

  // SORT HANDLER

  // Updates the selected sorting option
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // FILTERING & SORTING LOGIC

  // Build category options from the fetched products
  const categoryOptions = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  ).sort();

  // Build condition options from the fetched products
  const conditionOptions = Array.from(
    new Set(products.map((p) => p.condition).filter(Boolean))
  ).sort();

  // Derived list (filters products based on search, category, and condition & sorts the filtered results according to the selected sort option)
  const visibleProducts = [...products]
    .filter((p) => {
      const matchesSearch = (p.title ?? "")
        .toLowerCase()
        .includes((searchTerm ?? "").toLowerCase()); // Safe fallback if searchTerm is empty or undefined

      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;

      const matchesCondition =
        conditionFilter === "all" || p.condition === conditionFilter;

      return matchesSearch && matchesCategory && matchesCondition;
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
          // Higher id = more recent (json-server incremental ids)
          return (b.id ?? 0) - (a.id ?? 0);
        case "old":
          return (a.id ?? 0) - (b.id ?? 0);
        default:
          // Keeps the original order from the API
          return 0;
      }
    });

  // EARLY RETURNS (for when the app is still loading data or if an error occurs during the fetch process)
  if (isLoading) return <p>Loading products...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;

  // RENDER (data has already been fetched, filtered, and sorted into visibleProducts)
  // Displays the UI and renders the final list of products based on the current filters and sorting options
  return (
    <div>
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
          {categoryOptions.map((cat) => (
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
          {conditionOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
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

      {visibleProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="products-grid">
          {visibleProducts.map((p) => (
            <li key={p.id} className="product-card">
              <img
                src={p.imgUrl?.trim() ? p.imgUrl : placeholderImg}
                alt={p.title}
                className="product-img"
              />

              <h3>{p.title}</h3>
              <p className="condition">{p.condition}</p>
              <p className="price">{p.price} €</p>

              <div className="card-actions">
                <button onClick={() => navigate(`/product/${p.id}`)}>
                  Details
                </button>
                <button onClick={() => navigate(`/edit/${p.id}`)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
