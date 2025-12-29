import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005/products";

function NewItemPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerContact, setSellerContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price: Number(price),
      imgUrl,
      description,
      category,
      condition,
      sellerName,
      sellerContact,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to create product");

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Sell a Product</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Create</button>
      </form>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default NewItemPage;
