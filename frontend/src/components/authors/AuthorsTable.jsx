import { Col, Table } from "react-bootstrap";
import useGetAuthors from "../../hooks/authors/useGetAuthors";
import MySpinner from "../MySpinner";

function AuthorsTable() {
  const { authors, loading, error } = useGetAuthors();

  if (loading) return <MySpinner />;

  return (
    <Col>
      <Table responsive hover bordered striped>
        <thead>
          <tr>
            <th>Profile image</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Date of birth</th>
          </tr>
        </thead>

        <tbody>
          {authors.map((author) => (
            <tr key={author._id}>
              <td>
                <img
                  src={author.cover}
                  alt={`${author.name} ${author.surname}`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </td>
              <td>{author.name}</td>
              <td>{author.surname}</td>
              <td>{author.email}</td>
              <td>{author.dateOfBirth}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}

export default AuthorsTable;
