import { Col, Card, Spinner, Alert, Button, Row } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";

import MySpinner from "../MySpinner";

import useGetPost from "../../hooks/posts/useGetPost";
import useDeletePost from "../../hooks/posts/useDeletePost";

function PostDetails() {
  const { id } = useParams();
  const { post, loading, error } = useGetPost(id);
  const { postDeleted, loading: loadingDelete, error: errorDelete, handleDelete } = useDeletePost();
  const navigate = useNavigate()

  if (loading) return <MySpinner />;

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!post) {
    return <p className="text-center">Post not found</p>;
  }

  return (
    <>
      <Col sm={12} md={12} lg={12} className="mx-auto my-4">
        <Button className="mb-2" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Button>
        <Card style={{ cursor: "pointer" }}>
          {/* IMG POST */}
          <Card.Img
            src={post.cover}
            variant="top"
            className="w-100"
            style={{ height: "400px", objectFit: "cover" }}
          />

          <Card.Body className="d-flex flex-column">
            
            {/* TITOLO POST */}
            <Card.Title title={post.title} className="text-center">
              {post.title}
            </Card.Title>

            {/* CONTENUTO POST */}
            <Card.Text className="fst-italic fw-semibold text-primary">
              {post.content}
            </Card.Text>

            {/* AUTORE POST */}
            <Card.Text className="text-center fst-italic fw-semibold">
              {post.author?.name || post.author?.email || post.author || "Unknown author"}
            </Card.Text>

            {/* CATEGORIA POST */}
            <Card.Text className="text-center fst-italic fw-semibold">
              {post.category}
            </Card.Text>

            {/* BTN MODIFICA */}
            <Button variant="warning" className="mb-2">
              <i className="bi bi-pencil-square me-2"></i>
              Update
            </Button>

            {/* BTN ELIMINA */}
            <Button variant="danger" onClick={()=>handleDelete}>
              <i className="bi bi-trash me-2"></i>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default PostDetails;
