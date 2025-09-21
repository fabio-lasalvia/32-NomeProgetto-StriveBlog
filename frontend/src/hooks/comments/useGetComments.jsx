import { useEffect, useState } from "react"
import { getAllComments } from "../../../data/comments"


function useGetComments(postId) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    async function fetchComments() {
        setLoading(true)
        setError(null)
        try {
            const data = await getAllComments(postId)
            setComments(data)
        } catch (error) {
            setError(`Errore nel caricamento di tutti i commenti: ${error}`);
            console.log("Errore nel caricamento di tutti i commenti: ", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (postId) {
            fetchComments()
        }
    }, [postId])

    return { comments, loading, error, fetchComments }
}

export default useGetComments