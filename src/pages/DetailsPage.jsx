import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import placeholderImg from "../assets/placeholder.png"; //fallback
import { API_URL } from "../config/apiConfig"

// Backend endpoint (json-server)
// const API_URL = "http://localhost:5005/products";

// Mock reviews (UI demonstration only)
const mockReviews = [
  {
    id: 1,
    user: "Luís",
    rating: 5,
    comment: "Great product, exactly as described!",
  },
  {
    id: 2,
    user: "Victor",
    rating: 4,
    comment: "Good quality!",
  },
  {
    id: 3,
    user: "FakeReviewer",
    rating: 5,
    comment: "Very happy with this purchase. Recommended!",
  },
];

function DetailsPage() {
  // Route params and navigation
  const { id } = useParams();
  const navigate = useNavigate();

  // DATA STATE
  // Stores the fetched product
  const [product, setProduct] = useState(null);
  // Loading + error UI states
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // DATA FETCHING
  // Fetch product details when the page loads or when id change
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const response = await fetch(`${API_URL/products}/${id}`);
        if (!response.ok) throw new Error("Product not found");

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // DELETE HANDLER
  // Removes the product from the backend and redirects to homepage
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL/products}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete product");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // EARLY RETURNS (for when the app is still loading data or if an error occurs during the fetch process)
  if (isLoading) return <p>Loading product...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;
  if (!product) return <p>Product not found.</p>;

  // Status fallback for older products that don't have the status field
  const status = product.status ?? "available";
  const statusLabel = status[0].toUpperCase() + status.slice(1);

  // RENDER
  // Displays full product information and available actions
  return (
    <div className="details-page">
      <div className="details-main">
        {/* IMAGE */}
        <div className="details-image">
          <img
            src={product.imgUrl?.trim() ? product.imgUrl : placeholderImg}
            alt={product.title}
          />
        </div>

        {/* INFO */}
        <div className="details-info">
          <h1>{product.title}</h1>

          <p className="details-price">{product.price} €</p>

          <span className={`status ${status}`}>{statusLabel}</span>

          <p className="details-condition">{product.condition}</p>

          <p className="details-description">{product.description}</p>

          <div className="details-meta">
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Seller:</strong> {product.sellerName}
            </p>
            <p>
              <strong>Contact:</strong> {product.sellerContact}
            </p>
          </div>

          <div className="details-actions">
            <button onClick={() => navigate(`/edit/${product.id}`)}>
              Edit
            </button>
            <button className="danger" onClick={handleDelete}>
              Delete
            </button>
            <button className="secondary" onClick={() => navigate("/")}>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <section className="details-reviews">
        <h2>Customer reviews</h2>

        {mockReviews.map((review) => (
          <div key={review.id} className="review">
            <p>
              <strong>{review.user}</strong> — {"⭐".repeat(review.rating)}
            </p>
            <p>{review.comment}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default DetailsPage;
