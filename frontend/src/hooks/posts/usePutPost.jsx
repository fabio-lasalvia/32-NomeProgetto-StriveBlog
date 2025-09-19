import { useState } from "react";
import { updatePost } from "../../../data/post";

function usePutPost() {
  const [postUpdated, setPostUpdated] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function putPostData(id) {
    setLoading(true)
    setError(null)
    try {
      const data = await updatePost(id);
      setPostUpdated(data);
    } catch (error) {
      setError("Errore nell'aggiornamento del singolo post: ", error);
      console.log("Errore nell'aggiornamento del singolo post: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  return { postUpdated, loading, error, putPostData };
}

export default usePutPost;
