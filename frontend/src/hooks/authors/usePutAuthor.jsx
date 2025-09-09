import { useState } from "react";
import { updateAuthor } from "../../../data/author";

function usePutAuthor() {
  const [authorUpdated, setAuthorUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function putAuthorData(id, updatedAuthor) {
    setLoading(true);
    setError(null);
    try {
      const data = await updateAuthor(id, updatedAuthor);
      setAuthorUpdated(data);
    } catch (error) {
      setError(`Errore nell'aggiornamento dell'autore: ${error}`);
      console.error("Errore nell'aggiornamento dell'autore:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return { authorUpdated, loading, error, putAuthorData };
}

export default usePutAuthor;
