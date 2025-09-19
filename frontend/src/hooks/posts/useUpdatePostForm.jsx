import { useState, useEffect } from "react";
import { updatePost } from "../../../data/post";

function useUpdatePostForm(initialPost = null) {
    const [title, setTitle] = useState(initialPost?.title || "");
    const [content, setContent] = useState(initialPost?.content || "");
    const [category, setCategory] = useState(initialPost?.category || "");
    const [cover, setCover] = useState(initialPost?.cover || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postUpdated, setPostUpdated] = useState(null);

    useEffect(() => {
        if (initialPost) {
            setTitle(initialPost.title || "");
            setContent(initialPost.content || "");
            setCategory(initialPost.category || "");
            setCover(initialPost.cover || null);
        }
    }, [initialPost]);

    const handleUpdate = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await updatePost(id, { title, content, category, cover });
            setPostUpdated(data);
            return true;
        } catch (err) {
            console.error("Errore aggiornamento post:", err);
            setError("Errore nell'aggiornamento del post.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        title,
        setTitle,
        content,
        setContent,
        category,
        setCategory,
        cover,
        setCover,
        loading,
        error,
        postUpdated,
        handleUpdate,
    };
}

export default useUpdatePostForm;
