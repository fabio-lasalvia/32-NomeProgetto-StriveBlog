import { useState } from "react";
import { patchAuthor, patchAuthorBio } from "../../../data/author";

export default function usePatchAuthor() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [author, setAuthor] = useState(null);

    // Aggiorna avatar
    const updateAvatar = async (id, file) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await patchAuthor(id, file);
            setAuthor(updated);
            setLoading(false);
            return updated;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    // Aggiorna bio
    const updateBio = async (id, bio) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await patchAuthorBio(id, bio);
            setAuthor(updated);
            setLoading(false);
            return updated;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return {
        author,
        loading,
        error,
        updateAvatar,
        updateBio,
    };
}
