import { Modal, Button } from "react-bootstrap";

function ConfirmDeleteModal({ isOpen, onConfirm, onCancel, itemName = "item" }) {
    return (
        <Modal show={isOpen} onHide={onCancel}>
            <Modal.Header closeButton className="bg-danger text-white">
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete? <strong>{itemName}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    <i className="bi bi-x-circle me-2"></i>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    <i className="bi bi-trash-fill me-2"></i>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDeleteModal;
