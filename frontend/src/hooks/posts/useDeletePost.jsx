import { useState } from "react";

import { deletePost } from "../../../data/post";

function useDeletePost() {
  const [postDeleted, setPostDeleted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete(id) {
    setLoading(true)
    setError(null)
    try {
      setLoading(true);
      setError(null);
      const data = await deletePost(id);
      setPostDeleted(data);
    } catch (error) {
      setError("Errore nell'eliminazione del post: ", error);
    } finally {
      setLoading(false);
    }
  }

  return { postDeleted, loading, error, handleDelete };
}

export default useDeletePost;
