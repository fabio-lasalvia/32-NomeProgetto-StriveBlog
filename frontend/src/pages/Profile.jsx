import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MySpinner from "../components/common/MySpinner";
import useGetMe from "../hooks/authors/useGetMe";
import useAuthorPosts from "../hooks/authors/useAuthorPosts";
import usePatchAuthor from "../hooks/authors/usePatchAuthor";

function Profile() {
  const navigate = useNavigate();
  const { me, loading: loadingMe, error: errorMe, setMe } = useGetMe();
  const { posts, loading: loadingPosts, error: errorPosts } = useAuthorPosts(me?._id);
  const { updateAvatar, updateBio, loading: loadingPatch, error: errorPatch } = usePatchAuthor();

  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (me?.bio) setBioInput(me.bio);
  }, [me]);

  if (loadingMe || loadingPosts) return <MySpinner />;

  if (errorMe || errorPosts) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{errorMe || errorPosts}</Alert>
      </Container>
    );
  }

  const handleSaveProfile = async () => {
    try {
      let updatedAuthor = me;

      if (avatarFile) {
        updatedAuthor = await updateAvatar(me._id, avatarFile);
      }

      if (editingBio) {
        updatedAuthor = await updateBio(me._id, bioInput);
      }

      setMe(updatedAuthor);
      setEditingBio(false);
      setAvatarFile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col md={4} className="text-center mb-4">
          <div className="mb-3 position-relative">
            <img
              src={avatarFile ? URL.createObjectURL(avatarFile) : me?.avatar}
              alt={me?.name}
              className="rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="mt-2"
            />
          </div>
          <h4>{me?.name}</h4>
          <p className="text-muted">{me?.email}</p>
          <Button className="mb-2" variant="outline-primary" onClick={handleSaveProfile} disabled={loadingPatch}>
            {loadingPatch ? "Saving..." : "Save Profile"}
          </Button>
          {errorPatch && <Alert variant="danger" className="mt-2">{errorPatch.message || errorPatch}</Alert>}
        </Col>

        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>About Me</Card.Title>
              {editingBio ? (
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                />
              ) : (
                <Card.Text>{me?.bio || "No biography available."}</Card.Text>
              )}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingBio(!editingBio)}
                className="d-flex ms-auto mt-2"
              >
                {editingBio ? "Cancel" : "Edit Bio"}
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>My Posts</Card.Title>
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post._id} className="mb-3">
                    <Row className="align-items-center g-2">
                      <Col xs={12} md={4}>
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="img-fluid rounded"
                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <h5>{post.title}</h5>
                        <p>{post.content.substring(0, 150)}...</p>
                      </Col>
                      <Col xs={12} md={2} className="text-md-end text-center">
                        <small className="text-muted">
                          {post.readTime?.value} {post.readTime?.unit}
                        </small>
                      </Col>
                    </Row>
                    <Card.Footer className="text-center mt-2">
                      <Button variant="primary" onClick={() => navigate(`/posts/${post._id}`)}>
                        Read More
                      </Button>
                    </Card.Footer>
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
