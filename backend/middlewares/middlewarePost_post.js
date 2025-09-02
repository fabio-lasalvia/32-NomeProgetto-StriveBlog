import Post from "../models/Post.js";

export async function validatePost(request, response, next) {
  const { category, title, cover, readTime, author, content } = request.body;
  const { id } = request.params;
  if (!category || !title || !cover || !readTime || !author || !content) {
    return response.status(400).json({
      message: "I campi elencati sono obbligatori",
    });
  }

  const filter = { $and: [{ title }] };

  if (id) {
    //Stiamo eseguendo una Put
    filter.$and.push({ _id: { $ne: id } });
  }
  console.log(id);
  console.log(filter);


  const Posts = await Post.find(filter);
  console.log(Posts);

  if (Posts.length > 0) {
    return response
      .status(400)
      .json({ message: "Il titolo non può essere identico ad un altro post" });
  }

  next();
}
