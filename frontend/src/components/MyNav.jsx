import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";

import { NavLink, useNavigate } from "react-router-dom";
import useToggleTema from "../hooks/common/useToggleTema";

function MyNav() {

  const navigate = useNavigate()

  const { tema, changeTema } = useToggleTema()

  return (
    <Navbar
      expand="md"
      className="py-2"
      bg={tema === "data-bs-theme-light" ? "light" : "dark"}
      variant={tema === "data-bs-theme-light" ? "light" : "dark"}
    >
      <Container fluid className="align-items-center">
        {/* SINISTRA: LOGO */}
        <div className="order-0">
          <Navbar.Brand as={NavLink} to="/">
            <img
              src="img/logo/logoStriveBlog0.png"
              alt="Logo Strive Blog"
              className="rounded"
              style={{ maxWidth: "100px" }}
            />
          </Navbar.Brand>
        </div>

        {/* Link da md in su */}
        <div className="d-none d-md-flex order-1 ms-3">
          <Nav>
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-post">
              Add Post
            </Nav.Link>
          </Nav>
        </div>

        {/* DESTRA: SEARCHBAR + PROFILO + HAMBURGER */}
        <div className="ms-auto d-flex align-items-center gap-2 order-2">
          {/* SEARCHBAR */}
          <Form className="d-flex" role="search">
            <InputGroup size="sm">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button variant="outline-light">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>

          {/* TEMA */}
          <Button
            variant={tema === "data-bs-theme-light" ? "light" : "dark"}
            className={`d-flex align-items-center rounded btn btn-sm ${tema === "data-bs-theme-light" ? "text-dark" : "text-light"}`}
            onClick={changeTema}
          >
            {tema === 'data-bs-theme-light' ?
              <i className="bi bi-moon-fill"></i>
              :
              <i className="bi bi-sun-fill"></i>
            }
          </Button>

          {/* PROFILO */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-user"
              className="d-flex align-items-center rounded btn btn-sm"
            >
              <i className="bi bi-person-circle fs-5"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/login")}>Login</Dropdown.Item>
              <Dropdown.Item>Impostazioni</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger">Esci</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* HAMBURGER */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="d-md-none"
          />
        </div>
      </Container>

      {/* Link per mobile */}
      <div className="d-md-none">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="px-3">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-post">
              Add Post
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default MyNav;
