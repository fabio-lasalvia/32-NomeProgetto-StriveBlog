import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import usePostForm from "../../hooks/posts/usePostForm";

import ModalPostCreated from "../common/ModalPostCreated";
import useHandleModal from "../../hooks/common/useHandleModals";


function AddPostForm() {
  const { isOpen, openModal, closeModal } = useHandleModal();

  const {
    title,
    setTitle,
    category,
    setCategory,
    cover,
    setCover,
    readTimeValue,
    setReadTimeValue,
    readTimeUnit,
    setReadTimeUnit,
    author,
    setAuthor,
    content,
    setContent,
    setPostCreated,
    handleSubmit,
    loading,
    error,
  } = usePostForm();

  const addCover = (e) => {
    setCover(e.target.files[0]);
  };

  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    const success = await handleSubmit(e);
    if (success) {
      localStorage.setItem("postCreated", "true");
      navigate("/");
    }
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cover URL</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setCover(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time reading</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              type="number"
              value={readTimeValue}
              onChange={(e) => setReadTimeValue(e.target.value)}
              required
              min={1}
            />
            <Form.Select
              value={readTimeUnit}
              onChange={(e) => setReadTimeUnit(e.target.value)}
            >
              <option value="minute">minutes</option>
              <option value="hour">hours</option>
            </Form.Select>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Create Post"}
        </Button>
      </Form>

      <ModalPostCreated isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default AddPostForm;
