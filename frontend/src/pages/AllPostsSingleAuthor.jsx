// src/pages/AllPostsSingleAuthor.jsx
import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Card, Alert } from "react-bootstrap"
import useAuthorPosts from "../hooks/authors/useAuthorPosts"
import MySpinner from "../components/common/MySpinner"

function AllPostsSingleAuthor() {
  const { authorId } = useParams()
  const { posts, loading, error } = useAuthorPosts(authorId)

  if (loading) return <MySpinner/>
    

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  if (posts.length === 0) {
    return (
      <Container className="py-5 text-center">
        <p>Nessun post trovato per questo autore.</p>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Post di questo autore</h2>
      <Row>
        {posts.map((post) => (
          <Col md={4} sm={6} xs={12} key={post._id} className="mb-4">
            <Card>
              {post.cover && (
                <Card.Img
                  variant="top"
                  src={post.cover}
                  alt={post.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text className="text-truncate">
                  {post.content}
                </Card.Text>
                <Link to={`/posts/${post._id}`} className="btn btn-primary btn-sm">
                  Read more
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default AllPostsSingleAuthor
