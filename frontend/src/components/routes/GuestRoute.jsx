import { Navigate } from "react-router-dom";

function GuestRoute({ isLogged, children }) {
    if (isLogged) {
        return <Navigate to="/" replace />
    }

    return children
}

export default GuestRoute