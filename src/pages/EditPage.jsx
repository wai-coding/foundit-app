import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import placeholderImg from "../assets/placeholder.png";

const API_URL = "http://localhost:5005/products";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerContact, setSellerContact] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Product not found");

        const data = await response.json();

        setTitle(data.title ?? "");
        setPrice(String(data.price ?? ""));
        setImgUrl(data.imgUrl ?? "");
        setDescription(data.description ?? "");
        setCategory(data.category ?? "");
        setCondition(data.condition ?? "");
        setSellerName(data.sellerName ?? "");
        setSellerContact(data.sellerContact ?? "");
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Failed to update product");

      navigate(`/product/${id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;

  return (
    <div>
      <h1>Edit Product</h1>
      {/* Placeholder image used for all products (temporary) */}
      <img
        src={placeholderImg}
        alt="Product placeholder"
        className="product-img"
      />
      {/* Future version (real product images):
  <img src={`/assets/${imgUrl}`} alt={title} className="product-img" />
*/}
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
        <button type="submit">Save</button>
      </form>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default EditPage;
