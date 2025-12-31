import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../assets/placeholder.png";

const API_URL = "http://localhost:5005/products";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);
        setOriginalProducts(data);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedProducts = [...products];

    switch (option) {
      case "az":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "za":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;

      case "recent":
        sortedProducts.sort((a, b) => b.id - a.id);
        break;

      case "old":
        sortedProducts.sort((a, b) => a.id - b.id);
        break;

      default:
        sortedProducts = [...originalProducts];
    }

    setProducts(sortedProducts);
  };

  if (isLoading) return <p>Loading products...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;

  return (
    <div>
      <h1>Products</h1>

      {/* SORT SELECT */}
      <div className="sort-wrapper">
        <label htmlFor="sort">Sort by:</label>

        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="">Default</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="recent">Most recent</option>
          <option value="old">Oldest</option>
        </select>
      </div>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul className="products-grid">
          {products.map((p) => (
            <li key={p.id} className="product-card">
              {/* Placeholder image used for all products (temporary) */}
              <img src={placeholderImg} alt={p.title} className="product-img" />

              {/* Future version (real product images):
              <img
                src={`/assets/${p.imgUrl}`}
                alt={p.title}
                className="product-img"
              />
              */}

              <h3>{p.title}</h3>
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
