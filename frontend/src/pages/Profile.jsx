import useGetAuthor from "../hooks/authors/useGetAuthor";
import { Alert } from "react-bootstrap";
import MySpinner from "../components/common/MySpinner";

function Profile() {
  const { author, loading, error } = useGetAuthor();

  if (loading) return <MySpinner />;

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!author) {
    return <p>Author not found.</p>;
  }

  return (
    <>
      <h1>{`Benvenuto ${author.name}`}</h1>
    </>
  );
}

export default Profile;
