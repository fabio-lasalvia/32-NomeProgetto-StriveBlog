import { useEffect, useState } from "react";
import { getAll } from "../../data/post";

function useGetPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAll();
        setPosts(data);
      } catch (error) {
        setError("Errore nel caricamento di tutti i post: ", error);
        console.log("Errore nel caricamento di tutti i post: ", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export default useGetPosts;
