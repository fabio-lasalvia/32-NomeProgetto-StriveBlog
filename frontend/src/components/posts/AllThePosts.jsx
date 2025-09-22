import { Row, Alert, Form, InputGroup, Pagination } from "react-bootstrap";
import SinglePost from "./SinglePost";
import useGetPosts from "../../hooks/posts/useGetPosts";
import MySpinner from "../common/MySpinner";
import useFilterPost from "../../hooks/posts/useFilterPost";
import usePagination from "../../hooks/common/usePagination";

function AllThePosts() {
  const { posts, loading, error } = useGetPosts();
  const { query, setQuery, filteredPosts } = useFilterPost(posts);
  const { currentPage, totalPages, currentItems, goToPage } = usePagination(filteredPosts, 4);

  if (loading) return <MySpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <h2 className="text-center mb-4">All Posts</h2>
      <Form className="d-flex mb-4" role="search">
        <InputGroup size="sm">
          <Form.Control
            type="search"
            placeholder="Search post..."
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Form>

      <Row>
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((post) => <SinglePost key={post._id} post={post} />)
        ) : (
          <p className="text-center">No posts available</p>
        )}
      </Row>

      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </>
  );
}

export default AllThePosts;
