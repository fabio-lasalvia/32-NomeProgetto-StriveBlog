import { Row, Spinner, Alert, Form, InputGroup, Button } from "react-bootstrap";
import SinglePost from "./SinglePost";
import useGetPosts from "../../hooks/posts/useGetPosts";
import MySpinner from "../common/MySpinner";

function AllThePosts() {
  const { posts, loading, error } = useGetPosts();

  if (loading) return <MySpinner />;

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <h2 className="text-center mb-4">All Posts</h2>
      <Row>
        {/* SEARCHBAR */}
            <Form className="d-flex mb-4" role="search">
              <InputGroup size="sm">
                <Form.Control
                  type="search"
                  placeholder="Search post..."
                  aria-label="Search"
                />
                <Button variant="outline-light">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
        {posts && posts.length > 0 ? (
          posts.map((post) => <SinglePost key={post._id} post={post} />)
        ) : (
          <p className="text-center">No posts available</p>
        )}
        {console.log(posts)}
      </Row>
    </>
  );
}

export default AllThePosts;
