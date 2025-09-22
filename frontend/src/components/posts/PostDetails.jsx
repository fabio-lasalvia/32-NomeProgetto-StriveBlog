import { useState } from "react";
import { Col, Card, Alert, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import MySpinner from "../common/MySpinner";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";

import CommentArea from "../comments/CommentArea";

import useGetPost from "../../hooks/posts/useGetPost";
import useDeletePost from "../../hooks/posts/useDeletePost";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  //// GET SINGLE POST ////
  const { post, loading, error } = useGetPost(id);

  //// DELETE ////
  const { handleDelete, loading: loadingDelete, error: errorDelete } = useDeletePost();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleConfirmDelete = async () => {
    const success = await handleDelete(id);
    if (success) {
      handleCloseDeleteModal();
      navigate("/");
    }
  };

  //// EDIT/UPDATE ////
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => setIsEditing((prev) => !prev);

  const handleCancelEdit = () => setIsEditing(false);

  //// LOADING / ERROR ////
  if (loading) return <MySpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!post) return <p className="text-center">Post not found</p>;

  return (
    <>
      <Col sm={12} md={12} lg={10} className="mx-auto my-4">
        <Button className="mb-3" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left me-2"></i>Back
        </Button>

        <Card className="position-relative">
          {/* IMG POST */}
          <Card.Img
            src={post.cover}
            variant="top"
            className="w-100"
            style={{ height: "400px", objectFit: "cover" }}
          />

          <Card.Body>
            {/* TITOLO */}
            <Card.Title className="text-center mb-3">{post.title}</Card.Title>

            {/* CATEGORIA */}
            <Card.Text className="text-center fst-italic fw-semibold mb-3">
              {post.category}
            </Card.Text>

            {/* CONTENUTO */}
            <Card.Text className="fst-italic fw-semibold text-primary">
              {post.content}
            </Card.Text>

            {/* AUTORE */}
            <Card.Text className="text-center fst-italic fw-semibold">
              {post.author?.name || post.author?.email || post.author || "Unknown author"}
            </Card.Text>

            {/* BOTTONI AZIONI */}
            <div className="d-flex justify-content-center gap-2 mb-4">
              <Button
                size="sm"
                variant={isEditing ? "success" : "warning"}
                onClick={handleEditClick}
              >
                <i className={`bi ${isEditing ? "bi-check-lg" : "bi-pencil-square"} me-1`}></i>
                {isEditing ? "Save" : "Edit"}
              </Button>

              <Button
                size="sm"
                variant={isEditing ? "secondary" : "danger"}
                onClick={isEditing ? handleCancelEdit : handleOpenDeleteModal}
                disabled={loadingDelete && !isEditing}
              >
                <i className={`bi ${isEditing ? "bi-x-lg" : "bi-trash"} me-1`}></i>
                {isEditing ? "Cancel" : "Delete"}
              </Button>
            </div>

            {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}

            {/* COMMENT AREA */}
            <CommentArea postId={id} />
          </Card.Body>
        </Card>
      </Col>

      {/* MODALE DELETE */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemName={post.title}
      />
    </>
  );
}

export default PostDetails;
