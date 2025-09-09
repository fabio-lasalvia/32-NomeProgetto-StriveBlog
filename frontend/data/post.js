import axios from "./axios";

//////////////////////////////
///// GET - TUTTI I POST /////
//////////////////////////////
export async function getAllPosts() {
  try {
    const response = await axios.get("/posts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//////////////////////////////
///// GET - SINGOLO POST /////
//////////////////////////////
export async function getSinglePost(id) {
  try {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

///////////////////////////////
///// POST - SINGOLO POST /////
///////////////////////////////
export async function createPost(newPost) {
  try {
    const response = await axios.post("/posts", newPost);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////
///// DELETE - SINGOLO POST /////
/////////////////////////////////
export async function deletePost(id) {
  try {
    const response = await axios.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

///////////////////////////////
///// PATCH - SINGOLO POST /////
///////////////////////////////
export async function patchCover(id, file) {
  try {
    const formData = new FormData();
    formData.append("cover", file);

    const response = await axios.patch(`/posts/${id}/cover`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

