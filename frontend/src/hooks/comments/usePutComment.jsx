import { useState } from "react";
import { updateComment } from "../../../data/comments";

function usePutComment() {
    const [commentUpdated, setCommentUpdated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function putCommentData(postId, commentId, updatedComment) {
        setLoading(true)
        setError(null)
        try {
            const data = await updateComment(postId, commentId, updatedComment);
            setCommentUpdated(data);
            return true;
        } catch (error) {
            setError("Errore nell'aggiornamento del singolo commento: " + error.message);
            console.log("Errore nell'aggiornamento del singolo commento: ", error.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { commentUpdated, loading, error, putCommentData };
}

export default usePutComment;