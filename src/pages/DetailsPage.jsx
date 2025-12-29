import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005/products";

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const response = await fetch(`${API_URL}/${id}`);
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete product");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) return <p>Loading product...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>
        <strong>Price:</strong> {product.price} €
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Condition:</strong> {product.condition}
      </p>
      <p>
        <strong>Seller:</strong> {product.sellerName}
      </p>
      <p>
        <strong>Contact:</strong> {product.sellerContact}
      </p>

      <div>
        <button onClick={() => navigate(`/edit/${product.id}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
}

export default DetailsPage;
