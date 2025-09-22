import { useState } from "react";
import { updatePost } from "../../../data/post";

function usePutPost() {
  const [postUpdated, setPostUpdated] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function putPostData(id, updatedPost) {
    setLoading(true)
    setError(null)
    try {
      const data = await updatePost(id, updatedPost);
      setPostUpdated(data);
      return true
    } catch (error) {
      setError(`Errore nell'aggiornamento del singolo post: ${error.message}`);
      console.log("Errore nell'aggiornamento del singolo post: ", error.message);
      return false
    } finally {
      setLoading(false);
    }
  }

  return { postUpdated, loading, error, putPostData };
}

export default usePutPost;
