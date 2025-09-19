import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLogged, children }) {
    if (!isLogged) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute