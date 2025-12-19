import { useParams } from "react-router-dom";

function EditPage() {
  const { id } = useParams();
  return <div>Edit Page - ID {id}</div>;
}
export default EditPage;
