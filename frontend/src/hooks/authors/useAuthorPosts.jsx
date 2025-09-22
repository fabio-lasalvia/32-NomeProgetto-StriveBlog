import { useEffect, useState } from "react";
import axios from "../../../data/axios";

export default function useAuthorPosts(authorId) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!authorId) return;

        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/authors/${authorId}/posts`);
                setPosts(response.data);
            } catch (error) {
                console.error(error);
                setError("Impossibile caricare i post dell'autore");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [authorId]);

    return { posts, loading, error };
}
