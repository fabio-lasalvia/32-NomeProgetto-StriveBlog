import { useState } from "react";

import { createAuthor } from "../../../data/author";

function useCreateAuthor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createNewAuthor(newAuthor) {
    setLoading(true);
    setError(null);

    try {
      const data = await createAuthor(newAuthor);
      return data;
    } catch (error) {
      setError(`Errore nella creazione dell'autore: ${error}`);
      console.log("Errore nella creazione dell'autore: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  return { createNewAuthor, loading, error };
}

export default useCreateAuthor;
