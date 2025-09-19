import { Container, Row, Col, Card } from "react-bootstrap";
import AddPostForm from "../components/posts/AddPostForm";

function AddPost() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col sm={12} md={8} lg={6}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Create new post</h2>
            <AddPostForm />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddPost;
