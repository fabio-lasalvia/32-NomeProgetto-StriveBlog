import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function SinglePost({post}) {
  return (
    <>
      <Col sm={12} md={4} lg={3}>
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
            <Card.Text className="text-center fst-italic fw-semibold text-primary">
              {post.content}
            </Card.Text>
            {/* AUTORE POST */}
            <Card.Text className="text-center fst-italic fw-semibold text-black">
              {post.author}
            </Card.Text>
            {/* CATEGORIA POST */}
            <Card.Text className="text-center fst-italic fw-semibold text-black">
              {post.category}
            </Card.Text>
            {/* LINK DETTAGLI */}
            <Link
              to={`/posts/${post._id}`}
              state={post}
              className="btn btn-primary mt-auto"
            >
              Dettagli
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default SinglePost