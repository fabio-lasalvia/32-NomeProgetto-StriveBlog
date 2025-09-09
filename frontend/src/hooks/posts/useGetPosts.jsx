import { useEffect, useState } from "react";
import { getAllPosts } from "../../../data/post";

function useGetPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        setError(`Errore nel caricamento di tutti i post: ${error}`);
        console.log("Errore nel caricamento di tutti i post:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export default useGetPosts;
