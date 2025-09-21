import { useState } from "react"
import { createComment } from "../../../data/comments"


function useCreateComment() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function createNewComment(postId, newComment) {
        setLoading(true)
        setError(null)

        try {
            const data = await createComment(postId, newComment)
            return data
        } catch (error) {
            setError(`Errore nella creazione del commento: ${error}`);
            console.log("Errore nella creazione del commento: ", error.message);
        } finally {
            setLoading(false)
        }
    }

    return { createNewComment, loading, error }
}

export default useCreateComment