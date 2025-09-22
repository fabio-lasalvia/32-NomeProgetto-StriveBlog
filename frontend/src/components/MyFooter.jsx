import { Container, Row, Col, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MyFooter() {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <Container>
                <Row>
                    <Col sm={12} md={4}>
                        <h5>Discover</h5>
                        <ul className="list-unstyled">
                            <li><Nav.Link as={Link} to="/" className="text-white"><i className="bi bi-house-door-fill me-2"></i>Home</Nav.Link></li>
                            <li><Nav.Link as={Link} to="/" className="text-white"><i className="bi bi-card-list me-2"></i>All Posts</Nav.Link></li>
                            <li><Nav.Link as={Link} to="/" className="text-white"><i className="bi bi-hand-thumbs-up me-2"></i>Most Popular</Nav.Link></li>
                            <li><Nav.Link as={Link} to="/" className="text-white"><i className="bi bi-star me-2"></i>Favorites</Nav.Link></li>
                        </ul>
                    </Col>
                    <Col sm={12} md={4}>
                        <h5>Contacts</h5>
                        <ul className="list-unstyled">
                            <li><a href="mailto:info@striveblog.it" className="text-white"><i className="bi bi-envelope-check-fill me-2"></i>info@striveblog.it</a></li>
                            <li><a href="tel:+390123456789" className="text-white"><i className="bi bi-telephone me-2"></i>+39 0123 456789</a></li>
                            <li><span className="text-white"><i className="bi bi-signpost me-2"></i>2311 North Los Robles Ave, Pasadena (CA), USA</span></li>
                        </ul>
                    </Col>
                    <Col sm={12} md={4}>
                        <h5>Social</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white"><i className="bi bi-facebook me-2"></i>Facebook</a></li>
                            <li><a href="#" className="text-white"><i className="bi bi-instagram me-2"></i>Instagram</a></li>
                            <li><a href="#" className="text-white"><i className="bi bi-twitter-x me-2"></i>X</a></li>
                            <li><a href="#" className="text-white"><i className="bi bi-whatsapp me-2"></i>WhatsApp</a></li>
                        </ul>
                    </Col>
                </Row>
                <hr className="bg-secondary mt-4" />
                <p className="text-center text-secondary mb-0">&copy; 2025 Strive Blog. All rights reserved.</p>
            </Container>
        </footer>
    )
}

export default MyFooter