import { Modal, Button } from "react-bootstrap";

function ModalPostCreated({ isOpen, closeModal }) {
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton className="bg-success text-white">
                <Modal.Title>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Post Created
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-success text-white">
                Your post has been created successfully!
            </Modal.Body>
            <Modal.Footer className="bg-success">
                {/* <Button variant="light" onClick={closeModal}>
                    Close
                </Button> */}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPostCreated;
