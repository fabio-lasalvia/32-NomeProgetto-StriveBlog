import { useState } from "react";
import useCreatePost from "./useCreatePost";

function usePostForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState(null);
  const [readTimeValue, setReadTimeValue] = useState(5);
  const [readTimeUnit, setReadTimeUnit] = useState("minute");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [postCreated, setPostCreated] = useState(null);

  const { createNewPost, loading, error } = useCreatePost();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("cover", cover);
    formData.append("readTime[value]", Number(readTimeValue));
    formData.append("readTime[unit]", readTimeUnit);
    formData.append("author", author);
    formData.append("content", content);

    const result = await createNewPost(formData);

    if (result) {
      setPostCreated("Post creato con successo!");
      // Reset del form
      setTitle("");
      setCategory("");
      setCover(null);
      setReadTimeValue(5);
      setReadTimeUnit("minute");
      setAuthor("");
      setContent("");

      setTimeout(() => setPostCreated(null), 3000);
    } else {
      setPostCreated("Errore nella creazione del post");
    }
  }

  return {
    title, setTitle,
    category, setCategory,
    cover, setCover,
    readTimeValue, setReadTimeValue,
    readTimeUnit, setReadTimeUnit,
    author, setAuthor,
    content, setContent,
    postCreated,
    handleSubmit,
    loading,
    error,
  };
}

export default usePostForm;
