import { useState, useEffect } from "react";
import { getSinglePost } from "../../../data/post";

function useGetPost(id) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function fetchPost() {
      try {
        console.log("Fetching post id from frontend:", id);
        const data = await getSinglePost(id);
        setPost(data);
      } catch (error) {
        setError(`Errore nel caricamento del singolo post: ${error}`);
        console.log("Errore nel caricamento del singolo post: ", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  return { post, loading, error };
}

export default useGetPost;
