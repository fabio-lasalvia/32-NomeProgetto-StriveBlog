import { useState } from "react";
import { patchCover } from "../data/post";

function usePatchPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedPost, setUpdatedPost] = useState(null);

  async function updateCover(id, file) {
    setLoading(true);
    setError(null);

    try {
      const post = await patchCover(id, file);
      setUpdatedPost(post);
      return post;
    } catch (error) {
      setError(error.message || "Errore durante l’aggiornamento");
    } finally {
      setLoading(false);
    }
  }

  return { updateCover, loading, error, updatedPost };
}

export default usePatchPost;
