import { useState, useEffect } from "react";
import { Col, Card, Alert, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import MySpinner from "../common/MySpinner";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";

import CommentArea from "../comments/CommentArea";

import useGetPost from "../../hooks/posts/useGetPost";
import useDeletePost from "../../hooks/posts/useDeletePost";
import usePutPost from "../../hooks/posts/usePutPost";
import usePatchPost from "../../hooks/posts/usePatchPost";

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
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    readTime: 1,
    coverFile: null,
    coverPreview: "",
  });

  const { putPostData, loading: loadingPut, error: errorPut } = usePutPost();

  const { updateCover, loading: loadingCover, error: errorCover } = usePatchPost();

  const isSaving = loadingPut || loadingCover;

  // inizializza formData quando arriva il post
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        category: post.category,
        content: post.content,
        readTime: post.readTime?.value || 1,
        coverFile: null,
        coverPreview: post.cover,
      });
    }
  }, [post]);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleSaveEdit = async () => {
    let coverSuccess = true;
    let updatedCover = formData.coverPreview;

    if (formData.coverFile) {
      try {
        const updatedPost = await updateCover(id, formData.coverFile);
        if (!updatedPost || !updatedPost.cover) {
          coverSuccess = false;
          alert("Errore aggiornamento cover");
        } else {
          updatedCover = updatedPost.cover;
          setFormData((prev) => ({ ...prev, coverPreview: updatedCover }));
        }
      } catch (err) {
        console.error("Errore aggiornamento cover:", err);
        coverSuccess = false;
      }
    }

    if (!coverSuccess) return;

    const putSuccess = await putPostData(id, {
      title: formData.title,
      category: formData.category,
      content: formData.content,
      readTime: { value: Number(formData.readTime), unit: "minute" },
    });

    if (putSuccess) {
      setIsEditing(false);
      Object.assign(post, {
        title: formData.title,
        category: formData.category,
        content: formData.content,
        readTime: { value: Number(formData.readTime), unit: "minute" },
        cover: updatedCover,
      });
    }
  };

  //// LOADING / ERROR ////
  if (loading) return <MySpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!post) return <p className="text-center">Post not found</p>;

  return (
    <>
      <Col sm={12} md={12} lg={10} className="mx-auto my-4">
        <Button className="mb-3" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-2"></i>Back
        </Button>

        <Card className="position-relative">
          {/* IMG POST */}
          <div className="position-relative mb-3" style={{ height: "400px", cursor: isEditing ? "pointer" : "default" }}>
            <Card.Img
              src={formData.coverPreview || post.cover}
              variant="top"
              className="w-100 h-100"
              style={{ objectFit: "cover", filter: isEditing && "brightness(50%)" }}
            />

            {isEditing && (
              <>
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                  onClick={() => document.getElementById("coverInput").click()}
                >
                  <i className="bi bi-pencil-circle text-white" style={{ fontSize: "3rem" }}></i>
                </div>
                <input
                  id="coverInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData((prev) => ({
                        ...prev,
                        coverFile: file,
                        coverPreview: URL.createObjectURL(file),
                      }));
                    }
                  }}
                />
              </>
            )}
          </div>

          <Card.Body>
            {/* TITOLO */}
            {isEditing ? (
              <input
                type="text"
                className="form-control mb-3"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            ) : (
              <Card.Title className="text-center mb-3 text-primary">{post.title}</Card.Title>
            )}

            {/* CATEGORIA */}
            {isEditing ? (
              <input
                type="text"
                className="form-control mb-3"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            ) : (
              <Card.Text className="text-center fst-italic fw-semibold mb-3">
                {post.category}
              </Card.Text>
            )}

            {/* CONTENUTO */}
            {isEditing ? (
              <textarea
                className="form-control mb-3"
                rows={5}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            ) : (
              <Card.Text className="fst-italic fw-semibold">{post.content}</Card.Text>
            )}

            {/* TEMPO DI LETTURA */}
            {isEditing ? (
              <input
                type="number"
                min="1"
                className="form-control mb-3"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              />
            ) : (
              <Card.Text className="text-center fst-italic fw-semibold">
                <i className="bi bi-clock me-2"></i>
                {post.readTime?.value} {post.readTime?.unit || "minutes"}
              </Card.Text>
            )}

            {/* AUTORE */}
            <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
              <Card.Img
                src={post.author?.avatar}
                alt={post.author?.name}
                style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", cursor: "pointer" }}
                onClick={() => navigate(`/authors/${post.author._id}`)}
              />

              <Card.Text
                className="fst-italic fw-semibold mb-0"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/authors/${post.author._id}`)}
              >
                {post.author.name} {post.author.surname || ""}
              </Card.Text>
            </div>

            {/* BOTTONI AZIONI */}
            <div className="d-flex justify-content-center gap-2 mb-4">
              {isEditing ? (
                <>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={handleSaveEdit}
                    disabled={isSaving}
                  >
                    <i className="bi bi-check-lg me-1"></i>Save
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                  >
                    <i className="bi bi-x-lg me-1"></i>Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="warning" onClick={handleEditClick}>
                    <i className="bi bi-pencil-square me-1"></i>Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={handleOpenDeleteModal}
                    disabled={loadingDelete}
                  >
                    <i className="bi bi-trash me-1"></i>Delete
                  </Button>
                </>
              )}
            </div>

            {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
            {errorPut && <Alert variant="danger">{errorPut}</Alert>}

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
