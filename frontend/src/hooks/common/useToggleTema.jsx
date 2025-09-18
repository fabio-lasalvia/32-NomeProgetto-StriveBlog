import { useEffect, useState } from "react";

function useToggleTema() {
    const initialTema = localStorage.getItem("tema") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    const [tema, setTema] = useState(initialTema);

    function changeTema() {
        setTema(prev => (prev === "light" ? "dark" : "light"));
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", tema);
        localStorage.setItem("tema", tema);
    }, [tema]);

    return { tema, changeTema };
}

export default useToggleTema;
