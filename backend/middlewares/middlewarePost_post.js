import Post from "../models/Post.js";

export async function validatePost(request, response, next) {
  const { category, title, readTime, content } = request.body;
  const { id } = request.params;

  const missingFields = [];
  if (!category) missingFields.push("category");
  if (!title) missingFields.push("title");
  if (!readTime || !readTime.value) missingFields.push("readTime.value");
  if (!content) missingFields.push("content");
  if (!request.author) missingFields.push("author (authentication missing)");

  if (missingFields.length > 0) {
    return response.status(400).json({
      message: "I seguenti campi obbligatori sono mancanti",
      missingFields,
    });
  }

  // Controllo unicità del titolo
  const filter = { title };
  if (id) filter._id = { $ne: id }; // se è una PUT va escluso il post stesso

  const existingPosts = await Post.find(filter);

  if (existingPosts.length > 0) {
    return response
      .status(400)
      .json({ message: "Il titolo non può essere identico ad un altro post" });
  }

  next();
}
