import { Form, Button, Alert, Spinner } from "react-bootstrap";
import usePostForm from "../../hooks/posts/usePostForm";

function AddPostForm() {
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

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {setPostCreated && <Alert variant="success">{setPostCreated}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Titolo</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Categoria</Form.Label>
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
        <Form.Label>Tempo di lettura</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="number"
            value={readTimeValue}
            onChange={(e) => setReadTimeValue(e.target.value)}
            required
          />
          <Form.Select
            value={readTimeUnit}
            onChange={(e) => setReadTimeUnit(e.target.value)}
          >
            <option value="minute">minuti</option>
            <option value="hour">ore</option>
          </Form.Select>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contenuto</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>

      <Button type="submit" disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Crea Post"}
      </Button>
    </Form>
  );
}

export default AddPostForm;
