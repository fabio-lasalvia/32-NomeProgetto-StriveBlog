import { useState } from "react";

function usePutAuthor() {
  const [postUpdated, setPostUpdated] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function updatePost(id) {
    setLoading(true)
    setError(null)
    try {
      const data = await updateAuthor(id);
      setPostUpdated(data);
    } catch (error) {
      setError("Errore nell'aggiornamento del singolo post: ", error);
      console.log("Errore nell'aggiornamento del singolo post: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  return { postUpdated, loading, error, updatePost };
}

export default usePutAuthor;
