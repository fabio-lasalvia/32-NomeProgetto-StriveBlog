import axios from "./axios";

export async function getAll() {
  try {
    const response = await axios.get("/posts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSinglePost(id) {
  try {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(newPost) {
  try {
    const response = await axios.post("/posts", newPost);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
