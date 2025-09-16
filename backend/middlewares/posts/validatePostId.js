import mongoose from "mongoose"
import Post from "../../models/Post.js"

export async function validatePostId(request, response, next) {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ message: "Invalid post ID" }
        )
    }

    const post = await Post.findById(id)
    if (!post) {
        return response.status(404).json({ message: "Post not found" })
    }

    request.post = post

    next()
}