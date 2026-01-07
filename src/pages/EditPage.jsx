import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import placeholderImg from "../assets/placeholder.png"; //fallback

// Backend endpoint (json-server)
const API_URL = "http://localhost:5005/products";

function EditPage() {
  // Route params and navigation
  const { id } = useParams();
  const navigate = useNavigate();

  // Loading & error UI states
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // FORM STATE (pre-filled with the product data)
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [status, setStatus] = useState("available");

  // DATA FETCHING
  // Load the product once when the page opens (or when id changes)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const response = await fetch(`${API_URL/products}/${id}`);
        if (!response.ok) throw new Error("Product not found");

        const data = await response.json();

        // Fill the form with the existing product data (safe fallbacks)
        setTitle(data.title ?? "");
        setPrice(String(data.price ?? ""));
        setImgUrl(data.imgUrl ?? "");
        setDescription(data.description ?? "");
        setCategory(data.category ?? "");
        setCondition(data.condition ?? "");
        setSellerName(data.sellerName ?? "");
        setSellerContact(data.sellerContact ?? "");
        setStatus(data.status ?? "available");
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  // FORM SUBMISSION
  // Sends updated product data to the backend (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      title,
      price: Number(price),
      imgUrl,
      description,
      category,
      condition,
      sellerName,
      sellerContact,
      status,
    };

    try {
      const response = await fetch(`${API_URL/products}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Failed to update product");

      // Redirect back to the product details page after saving
      navigate(`/product/${id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  // EARLY RETURNS (for when the app is still loading data or if an error occurs during the fetch process)
  if (isLoading) return <p>Loading...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;

  // RENDER
  return (
    <div className="edit-page">
      <h1>Edit Product</h1>

      <div className="edit-layout">
        {/* IMAGE PREVIEW */}
        <div className="edit-image">
          <img
            src={imgUrl?.trim() ? imgUrl : placeholderImg}
            alt={title || "Product"}
          />
        </div>

        {/* FORM */}
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            min="0"
            required
          />

          <input
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="Image URL"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="Used - Excellent">Used - Excellent</option>
            <option value="Used - Very Good">Used - Very Good</option>
            <option value="Used - Good">Used - Good</option>
          </select>

          <input
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            placeholder="Seller name"
          />

          <input
            value={sellerContact}
            onChange={(e) => setSellerContact(e.target.value)}
            placeholder="Seller contact"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={4}
            required
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>

          <div className="form-actions">
            <button className="btn-primary" type="submit">
              Save changes
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPage;
