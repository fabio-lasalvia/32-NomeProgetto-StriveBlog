import { useState } from "react";
import useCreatePost from "./useCreatePost";

function usePostForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [readTimeValue, setReadTimeValue] = useState(5);
  const [readTimeUnit, setReadTimeUnit] = useState("minute");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [postCreated, setPostCreated] = useState(null);

  const { createNewPost, loading, error } = useCreatePost();

  async function handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      title,
      category,
      cover,
      readTime: { value: Number(readTimeValue), unit: readTimeUnit },
      author,
      content,
    };

    const result = await createNewPost(newPost);

    if (result) {
      setPostCreated("Post creato con successo!");
      // Reset del form
      setTitle("");
      setCategory("");
      setCover("");
      setReadTimeValue(5);
      setReadTimeUnit("minute");
      setAuthor("");
      setContent("");

      //Nasconde il messaggio dopo 3 secondi
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
