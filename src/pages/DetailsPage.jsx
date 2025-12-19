import { useParams } from "react-router-dom";

function DetailsPage() {
  const { id } = useParams();
  return <div>Details Page - ID {id}</div>;
}
export default DetailsPage;
