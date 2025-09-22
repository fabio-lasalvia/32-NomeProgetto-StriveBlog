export async function authPostOwner(request, response, next) {
    const post = request.post;
    const author = request.author;

    if (!post.author) {
        return response.status(400).json({ message: "Post has no author" });
    }

    // DEBUG
    console.log("Post author ID:", post.author.toString());
    console.log("Logged user ID:", author._id.toString());

    if (post.author.toString() !== author._id.toString()) {
        console.log("Auth failed: user is not the owner");
        return response.status(403).json({ message: "You are not the owner of this post" });
    }

    next();
}
