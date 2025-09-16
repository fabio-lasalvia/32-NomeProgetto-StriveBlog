import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../../CSS/LoginStyle.css";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Login() {
  const googleLogin = () => {
    window.location.href =
      import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GOOGLE_PATH;
  };

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("jwt");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, []);

  return (
    <div className="bgColor p-0 m-0">
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg rounded-4">
            <div className="text-center mb-4">
              <img
                src="/img/logo/faviconStriveBlog.png"
                alt="StriveBlog Logo"
                style={{ maxWidth: "100px", borderRadius: "12px" }}
              />
              <h2 className="mt-3">Welcome Back</h2>
              <p className="text-muted">Sign in to continue</p>
            </div>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" className="w-100 mb-3">
                Login
              </Button>

              <Button
                variant="outline-dark"
                className="w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={googleLogin}
              >
                <img
                  src="/img/logo/logoGoogleLogin.webp"
                  alt="Google Logo"
                  style={{ maxWidth: 24 }}
                />
                Login with Google
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
