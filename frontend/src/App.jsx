import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";

import PostDetails from "./components/posts/PostDetails";

import Home from "./pages/Home";
import AddPost from "./pages/AddPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout principale con navbar + footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="posts/:id" element={<PostDetails />} />
          <Route path="/add-post" element={<AddPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
