import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import useAuthorPosts from "../hooks/authors/useAuthorPosts";
import MySpinner from "../components/common/MySpinner";

export default function AllPostsSingleAuthor() {
  const { id } = useParams();
  const { posts, loading, error } = useAuthorPosts(id);
  const navigate = useNavigate();

  if (loading) return <MySpinner />
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">

      <div className="d-flex align-items-center mb-4">
        <Button className="me-3" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-2"></i>Back
        </Button>
        <h2 className="mx-auto mb-0">Posts by this author</h2>
      </div>

      {posts.length === 0 ? (
        <Alert variant="info">No posts found for this author.</Alert>
      ) : (
        posts.map((post) => (
          <Card key={post._id} className="mb-3 shadow-sm">
            <Row className="g-0 align-items-center">
              {/* Cover */}
              <Col md={3}>
                <Card.Img
                  src={post.cover}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px 0 0 8px",
                  }}
                />
              </Col>

              {/* Title + Content */}
              <Col md={7} className="p-3">
                <Card.Title>{post.title}</Card.Title>
                <Card.Text className="text-muted" style={{ fontSize: "0.95rem" }}>
                  {post.content}
                </Card.Text>
              </Col>

              {/* Read time */}
              <Col md={2} className="text-center p-3">
                <small className="text-secondary">
                  {post.readTime?.value} {post.readTime?.unit}
                </small>
              </Col>
            </Row>
          </Card>
        ))
      )}
    </Container>
  );
}
