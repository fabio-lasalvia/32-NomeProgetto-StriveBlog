import { Container, Row, Col } from "react-bootstrap";
import AllThePosts from "../components/AllThePosts";


function Home() {

  return (
    <>
      <h1 className="text-center py-3">Strive Blog</h1>

      <Container>
        <Row>
          <AllThePosts />
        </Row>
      </Container>
    </>
  );
}

export default Home;
