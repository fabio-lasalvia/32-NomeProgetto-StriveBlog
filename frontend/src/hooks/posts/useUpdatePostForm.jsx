import { useState, useEffect } from "react";
import usePutPost from "./usePutPost";
import usePatchPost from "./usePatchPost";

function useUpdatePostForm(post) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [cover, setCover] = useState(null);
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [postUpdated, setPostUpdated] = useState(null);

    const { putPostData, loading: loadingPut, error: errorPut } = usePutPost();
    const { updateCover, loading: loadingPatch, error: errorPatch } = usePatchPost();

    useEffect(() => {
        if (post) {
            setTitle(post.title || "");
            setCategory(post.category || "");
            setText(post.text || "");
            setAuthor(post.author || "");
            setCover(post.cover || null);
        }
    }, [post]);

    async function handleUpdate(e) {
        if (e?.preventDefault) e.preventDefault();

        if (cover instanceof File) {
            const patched = await updateCover(post.id, cover);
            if (patched) setCover(patched.cover);
        }

        const success = await putPostData(post.id, { title, category, text });
        if (success) setPostUpdated({ ...post, title, category, text, cover });

        return success;
    }

    return {
        title, setTitle,
        category, setCategory,
        cover, setCover,
        text, setText,
        author,
        postUpdated,
        handleUpdate,
        loading: loadingPut || loadingPatch,
        error: errorPut || errorPatch,
    };
}

export default useUpdatePostForm;
