import { useState, useEffect } from "react";
import { getMe } from "../../../data/author";

function useGetMe() {
    const [me, setMe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMe() {
            try {
                const data = await getMe();
                setMe(data);
            } catch (err) {
                console.error(err);
                setError("Errore nel caricamento dell'utente");
            } finally {
                setLoading(false);
            }
        }

        fetchMe();
    }, []);

    return { me, setMe, loading, error };
}

export default useGetMe