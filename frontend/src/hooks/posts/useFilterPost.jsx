import { useState, useMemo } from "react";

function useFilterPost(posts) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!query) return posts;
    return posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [posts, query]);

  return { query, setQuery, filteredPosts };
}

export default useFilterPost;
