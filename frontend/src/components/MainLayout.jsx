import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

import MyFooter from "./MyFooter";
import MyNav from "./MyNav";

function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNav />

      <main className="flex-grow-1 py-4">
        <Container>
          <Outlet />
        </Container>
      </main>

      <MyFooter />
    </div>
  );
}

export default MainLayout;
