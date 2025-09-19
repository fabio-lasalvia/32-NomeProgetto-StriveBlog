import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LogoutModal({ isOpen, closeModal }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        closeModal();
        navigate("/login");
    };

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to log out of your account?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left me-2"></i>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogoutModal;
