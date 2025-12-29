import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005/products";

function HomePage() {
  const [products, setProducts] = useState([]);
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
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <p>Loading products...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;

  return (
    <div>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong> — {p.price} €
              <div>
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
