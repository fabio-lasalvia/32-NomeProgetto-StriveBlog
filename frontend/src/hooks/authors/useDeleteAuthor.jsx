import { useState } from "react";

import { deleteAuthor } from "../../../data/author";


function useDeleteAuthor() {
  const [authorDeleted, setAuthorDeleted] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function handleDelete(id) {
    setLoading(true)
    setError(null)
    try {
      setLoading(true);
      setError(null);
      const data = await deleteAuthor(id);
      setAuthorDeleted(data);
    } catch (error) {
      setError("Errore nell'eliminazione dell'autore: ", error);
    } finally {
      setLoading(false);
    }
  }

  return { authorDeleted, loading, error, handleDelete };
}

export default useDeleteAuthor