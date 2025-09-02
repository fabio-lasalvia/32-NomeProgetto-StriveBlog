import { Row, Spinner, Alert } from "react-bootstrap";
import SinglePost from "./SinglePost";
import useGetPosts from "../hooks/useGetPosts";

function AllThePosts() {
  const { posts, loading, error } = useGetPosts();

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p>Caricamento in corso...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <h2 className="text-center mb-4">All Posts</h2>
      <Row>
        {posts && posts.length > 0 ? (
          posts.map((post) => <SinglePost key={post._id} post={post} />)
        ) : (
          <p className="text-center">Nessun post disponibile</p>
        )}
        {console.log(posts)}
      </Row>
    </>
  );
}

export default AllThePosts;
