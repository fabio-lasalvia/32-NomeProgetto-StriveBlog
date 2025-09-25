import { useState } from "react";
import { Card, Alert, Button, InputGroup, Form, Modal } from "react-bootstrap";
import MySpinner from "../common/MySpinner";

import useGetComments from "../../hooks/comments/useGetComments";
import useCreateComment from "../../hooks/comments/useCreateComment";
import useDeleteComment from "../../hooks/comments/useDeleteComment";
import usePutComment from "../../hooks/comments/usePutComment";
import useGetMe from "../../hooks/authors/useGetMe";

function CommentArea({ postId }) {
    const { me } = useGetMe();
    const { comments, loading, error, fetchComments } = useGetComments(postId);
    const { createNewComment, loading: loadingCreate, error: errorCreate } = useCreateComment();
    const { handleDelete: deleteComment, loading: loadingDelete, error: errorDelete } = useDeleteComment();
    const { putCommentData, loading: loadingUpdate, error: errorUpdate } = usePutComment();

    const [newComment, setNewComment] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    // CREATE COMMENT
    const handleCreateComment = async () => {
        if (!newComment.trim()) return;
        const created = await createNewComment(postId, { text: newComment });
        if (created) {
            setNewComment("");
            fetchComments();
        }
    };

    // START EDIT
    const startEdit = (comment) => {
        setEditingId(comment._id);
        setEditingText(comment.text);
    };

    // CANCEL EDIT
    const cancelEdit = () => {
        setEditingId(null);
        setEditingText("");
    };

    // CONFIRM EDIT
    const confirmEdit = async (id) => {
        const updated = await putCommentData(postId, id, { text: editingText });
        if (updated) {
            setEditingId(null);
            setEditingText("");
            fetchComments();
        }
    };

    // DELETE COMMENT
    const openDeleteModal = (comment) => {
        setCommentToDelete(comment);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!commentToDelete) return;
        const success = await deleteComment(postId, commentToDelete._id);
        if (success) {
            setShowDeleteModal(false);
            setCommentToDelete(null);
            fetchComments();
        }
    };

    return (
        <div className="mt-4">
            <h5>Comments</h5>

            {loading && <MySpinner />}
            {error && <Alert variant="danger">{error}</Alert>}
            {comments.length === 0 && !loading && <p>No comments yet</p>}

            {comments.map((comment) => {
                const isOwner = me?._id === comment.author?._id;
                return (
                    <div
                        key={comment._id}
                        className="border-bottom py-2 d-flex justify-content-between align-items-center"
                    >
                        {editingId === comment._id ? (
                            <InputGroup className="w-100">
                                <Form.Control
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    disabled={loadingUpdate}
                                />
                                <Button
                                    variant="success"
                                    onClick={() => confirmEdit(comment._id)}
                                    disabled={loadingUpdate}
                                >
                                    Save
                                </Button>
                                <Button variant="secondary" onClick={cancelEdit}>
                                    Cancel
                                </Button>
                            </InputGroup>
                        ) : (
                            <>
                                <span>
                                    {comment.text} - <em>{comment.author?.name || "Anonymous"}</em>
                                </span>
                                {isOwner && (
                                    <div>
                                        <Button
                                            size="sm"
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => startEdit(comment)}
                                        >
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="danger" onClick={() => openDeleteModal(comment)}>
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}

            <InputGroup className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={loadingCreate}
                />
                <Button onClick={handleCreateComment} disabled={loadingCreate}>
                    {loadingCreate ? "Sending..." : <i className="bi bi-send-fill"></i>}
                </Button>
            </InputGroup>
            {errorCreate && <Alert className="mt-2" variant="danger">{errorCreate}</Alert>}

            {/* DELETE CONFIRM MODAL */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete} disabled={loadingDelete}>
                        {loadingDelete ? "Deleting..." : "Delete"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {errorDelete && <Alert variant="danger" className="mt-2">{errorDelete}</Alert>}
            {errorUpdate && <Alert variant="danger" className="mt-2">{errorUpdate}</Alert>}
        </div>
    );
}

export default CommentArea;
