import axios from "./axios";

//////////////////////////////////
///// GET - TUTTI GLI AUTORI /////
//////////////////////////////////
export async function getAllAuthors() {
  try {
    const response = await axios.get("/authors");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

////////////////////////////////
///// GET - SINGOLO AUTORE /////
////////////////////////////////
export async function getSingleAuthor(id) {
  try {
    const response = await axios.get(`/authors/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////
///// POST - SINGOLO AUTORE /////
/////////////////////////////////
export async function createAuthor(newAuthor) {
  try {
    const response = await axios.post("/authors", newAuthor);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

////////////////////////////////
///// PUT - SINGOLO AUTORE /////
////////////////////////////////
export async function updateAuthor(id, updatedAuthor) {
  try {
    const response = await axios.post(`/authors/${id}`, updatedAuthor);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//////////////////////////////////
///// PATCH - SINGOLO AUTORE /////
//////////////////////////////////
export async function patchAuthor(id, file) {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await axios.patch(`/authors/${id}/avatar`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}

///////////////////////////////////
///// DELETE - SINGOLO AUTORE /////
///////////////////////////////////
export async function deleteAuthor(id) {
  try {
    const response = await axios.delete(`/authors/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}