import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/apiConfig";

// Backend endpoint (json-server)
// const API_URL = "http://localhost:5005/products";

function NewItemPage() {
  // Navigation hook to redirect after successful creation
  const navigate = useNavigate();

  // FORM STATE
  // Each piece of state corresponds to one form field
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerContact, setSellerContact] = useState("");

  // FORM SUBMISSION HANDLER
  // Sends the new product data to the backend (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build product object from form state
    const newProduct = {
      title,
      price: Number(price),
      imgUrl,
      description,
      category,
      condition,
      sellerName,
      sellerContact,
      status: "available", // new products are always available
    };

    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to create product");

      // Redirect to homepage after successful creation
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // RENDER
  // Displays the form for creating a new product
  return (
    <div className="sell-page">
      <h1>Sell a Product</h1>

      <form className="sell-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (€)"
            type="number"
            min="0"
            required
          />

          <input
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="Image URL"
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />

          <input
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Condition"
          />
        </div>

        <div className="form-section">
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
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewItemPage;
