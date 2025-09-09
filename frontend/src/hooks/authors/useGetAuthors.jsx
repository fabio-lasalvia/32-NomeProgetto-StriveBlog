import { useEffect, useState } from "react";
import { getAllAuthors } from "../../../data/author";

function useGetAuthors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAuthors() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllAuthors();
        setAuthors(data);
      } catch (error) {
        setError(`Errore nel caricamento di tutti i post: ${error}`);
        console.log("Errore nel caricamento di tutti gli autori:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthors();
  }, []);

  return { authors, loading, error };
}

export default useGetAuthors;
