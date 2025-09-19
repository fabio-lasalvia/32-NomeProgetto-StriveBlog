import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import AllThePosts from "../components/posts/AllThePosts";
import ModalPostCreated from "../components/common/ModalPostCreated";
import useHandleModal from "../hooks/common/useHandleModals";

function Home() {
  const { isOpen, openModal, closeModal } = useHandleModal();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("postCreated") === "true") {
      openModal();
      setTimeout(() => {
        closeModal();
        localStorage.removeItem("postCreated");
      }, 2000);
    }
  }, [location]);

  return (
    <>
      <h1 className="text-center py-3">Strive Blog</h1>

      <Container>
        <Row>
          <AllThePosts />
        </Row>
      </Container>

      <ModalPostCreated isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default Home;
