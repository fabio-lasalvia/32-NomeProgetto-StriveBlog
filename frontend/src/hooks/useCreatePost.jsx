import { useState } from "react";
import { createPost } from "../../data/post";

function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createNewPost(newPost) {
    setLoading(true);
    setError(null);

    try {
      const data = await createPost(newPost);
      return data;
    } catch (error) {
      setError("Errore nella creazione del post: ", error);
      console.log("Errore nella creazione del post: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  return { createNewPost, loading, error };
}

export default useCreatePost;
