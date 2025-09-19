import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile"
import AddPost from "./pages/AddPost";

import MainLayout from "./components/MainLayout";
import PostDetails from "./components/posts/PostDetails";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import GuestRoute from "./components/routes/GuestRoute";

function App() {
  const isLogged = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* GUEST ROUTES */}
        <Route
          path="/login"
          element={
            <GuestRoute isLogged={isLogged}>
              <Login />
            </GuestRoute>
          }
        />

        {/* PROTECT ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute isLogged={isLogged}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Home */}
          <Route index element={<Home />} />

          {/* Profilo */}
          <Route path="/profile" element={<Profile />} />

          {/* Dettaglio post */}
          <Route path="posts/:id" element={<PostDetails />} />

          {/* Aggiungi post */}
          <Route path="add-post" element={<AddPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
