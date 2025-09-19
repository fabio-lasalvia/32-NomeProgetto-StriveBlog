import { Modal, Button } from "react-bootstrap";

function ConfirmUpdateModal({ isOpen, onConfirm, onCancel }) {
    return (
        <Modal show={isOpen} onHide={onCancel}>
            <Modal.Header closeButton className="bg-warning text-dark">
                <Modal.Title>Confirm Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to update?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    <i className="bi bi-x-circle me-2"></i>
                    Cancel
                </Button>
                <Button variant="warning" onClick={onConfirm}>
                    <i className="bi bi-pencil-square me-2"></i>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmUpdateModal;
