import { useEffect, useState } from "react";
import { getAuthorPosts } from "../../../data/author";

export default function useAuthorPosts(id) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await getAuthorPosts(id);
                setPosts(data);
            } catch (error) {
                console.error(error);
                setError(`Cannot loading author's posts: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]);

    return { posts, loading, error };
}
