import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import MySpinner from "../components/common/MySpinner";
import useGetMe from "../hooks/authors/useGetMe";


function Profile() {
  const { me, loading, error } = useGetMe();

  if (loading) return <MySpinner />;

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        {/* Colonna sinistra: avatar e info */}
        <Col md={4} className="text-center">
          <img
            src={me?.avatar || "img/default-avatar.png"}
            alt={me?.name}
            className="rounded-circle mb-3"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h4>{me?.name}</h4>
          <p className="text-muted">{me?.email}</p>
          <Button variant="outline-primary">Edit Profile</Button>
        </Col>

        {/* Colonna destra: bio e post */}
        <Col md={8}>
          {/* About Me */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>About Me</Card.Title>
              <Card.Text>{me?.bio || "No biography available."}</Card.Text>
            </Card.Body>
          </Card>

          {/* My Posts */}
          <Card>
            <Card.Body>
              <Card.Title>My Posts</Card.Title>
              {me?.posts && me.posts.length > 0 ? (
                me.posts.map((post) => (
                  <Card key={post.id} className="mb-2">
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.body.substring(0, 100)}...</Card.Text>
                      <Button variant="primary" href={`/posts/${post.id}`}>
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>You haven't published any posts yet.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
