import { useState, useEffect } from "react";

import { getSingleAuthor } from "../../../data/author";

function useGetAuthor(id) {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function fetchAuthor() {
      try {
        const data = await getSingleAuthor(id);
        setAuthor(data);
      } catch (error) {
        setError(`Errore nel caricamento del singolo autore: ${error.message}`);
        console.log("Errore nel caricamento del singolo autore: ", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAuthor();
  }, [id]);

  return { author, loading, error };
}

export default useGetAuthor;
