import { useState } from "react";
import { patchCover } from "../../../data/post";
import { useAuth } from "../../context/AuthContext";

function usePatchPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedPost, setUpdatedPost] = useState(null);
  const { isLogged } = useAuth();

  async function updateCover(id, file) {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const post = await patchCover(id, file, token);
      setUpdatedPost(post);
      return post;
    } catch (error) {
      setError(error.message || "Errore durante l'aggiornamento");
      console.log("Errore nell'aggiornamento del singolo elemento del post: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  return { updateCover, loading, error, updatedPost };
}

export default usePatchPost;
