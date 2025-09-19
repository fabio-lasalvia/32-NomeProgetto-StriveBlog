import { useState } from "react";
import { Col, Card, Alert, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import MySpinner from "../common/MySpinner";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import ConfirmUpdateModal from "../common/ConfirmUpdateModal";

import useGetPost from "../../hooks/posts/useGetPost";
import useDeletePost from "../../hooks/posts/useDeletePost";
import useUpdatePostForm from "../../hooks/posts/useUpdatePostForm";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  ///////////////////////////
  ///// GET SINGLE POST /////
  ///////////////////////////
  const { post, loading, error } = useGetPost(id);

  //////////////////
  ///// DELETE /////
  //////////////////
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

  //////////////////
  ///// UPDATE /////
  //////////////////
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleOpenUpdateModal = () => setIsUpdateModalOpen(true);
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);

  const {
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    cover,
    setCover,
    loading: loadingUpdate,
    error: errorUpdate,
    handleUpdate,
  } = useUpdatePostForm(post);

  const handleConfirmUpdate = async () => {
    const success = await handleUpdate(id);
    if (success) {
      handleCloseUpdateModal();
    }
  };

  ///////////////////////////
  ///// LOADING / ERROR /////
  ///////////////////////////
  if (loading) return <MySpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!post) return <p className="text-center">Post not found</p>;

  return (
    <>
      <Col sm={12} md={12} lg={12} className="mx-auto my-4">
        <Button className="mb-2" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left me-2"></i>Back
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
            <Button
              variant="warning"
              className="mb-2"
              onClick={handleOpenUpdateModal}
              disabled={loadingUpdate}
            >
              <i className="bi bi-pencil-square me-2"></i>
              {loadingUpdate ? "Updating..." : "Update"}
            </Button>
            {errorUpdate && <Alert className="mt-2" variant="danger">{errorUpdate}</Alert>}

            {/* BTN ELIMINA */}
            <Button
              variant="danger"
              onClick={handleOpenDeleteModal}
              disabled={loadingDelete}
            >
              <i className="bi bi-trash me-2"></i>
              {loadingDelete ? "Deleting..." : "Delete"}
            </Button>
            {errorDelete && <Alert className="mt-2" variant="danger">{errorDelete}</Alert>}
          </Card.Body>
        </Card>
      </Col>

      {/* MODALE CONFERMA CANCELLAZIONE */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemName={post.title}
      />

      {/* MODALE CONFERMA UPDATE */}
      <ConfirmUpdateModal
        isOpen={isUpdateModalOpen}
        onCancel={handleCloseUpdateModal}
        onConfirm={handleConfirmUpdate}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        category={category}
        setCategory={setCategory}
        cover={cover}
        setCover={setCover}
      />
    </>
  );
}

export default PostDetails;
