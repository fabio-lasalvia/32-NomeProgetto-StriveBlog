import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function SinglePost({ post }) {
  return (
    <>
      <Col sm={12} md={6} lg={6}>
        <Card style={{ cursor: "pointer" }}>
          
          {/* IMG POST */}
          <Card.Img
            src={post.cover}
            variant="top"
            className="w-100"
            style={{
              height: "400px",
              objectFit: "cover",
            }}
          />
          <Card.Body className="d-flex flex-column">

            {/* TITOLO POST */}
            <Card.Title title={post.title} className="text-center text-truncate">
              {post.title}
            </Card.Title>

            {/* CONTENUTO POST */}
            <Card.Text className="fst-italic fw-semibold text-primary text-truncate" title={post.content}>
              {post.content}
            </Card.Text>

            {/* AUTORE POST */}
            <Card.Text className="text-center fst-italic fw-semibold">
              {post.author?.name || post.author?.email || post.author || "Unknown author"}
            </Card.Text>

            {/* CATEGORIA POST */}
            <Card.Text className="text-center fst-italic fw-semibold" title={post.category}>
              {post.category}
            </Card.Text>

            {/* LINK DETTAGLI */}
            <Link
              to={`/posts/${post._id}`}
              state={post}
              className="btn btn-primary mt-auto"
            >
              Details
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default SinglePost