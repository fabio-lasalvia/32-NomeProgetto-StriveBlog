import { useState } from "react";
import { deleteComment } from "../../../data/comments";

function useDeleteComment() {
    const [commentDeleted, setCommentDeleted] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleDelete(postId, commentId) {
        setLoading(true);
        setError(null);
        try {
            const data = await deleteComment(postId, commentId);
            setCommentDeleted(data);
            return true;
        } catch (error) {
            setError(`Errore nell'eliminazione del commento: ${error.message}`);
            console.log("Errore nell'eliminazione del commento: ", error.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { commentDeleted, loading, error, handleDelete };
}

export default useDeleteComment;
