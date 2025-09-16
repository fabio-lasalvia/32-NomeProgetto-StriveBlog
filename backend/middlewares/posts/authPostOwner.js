

export async function authPostOwner(request, response, next) {
    const post = request.post
    const author = request.author

    if (post.author !== author._id.toString()) {
        return response.status(403).json({ message: "You are not the owner of this post" })
    }
    next()
}