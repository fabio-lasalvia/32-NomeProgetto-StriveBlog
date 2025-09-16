

export async function validatePostBody(request, response, next) {
    const { category, title, content, readTime, author } = request.body;
    const readTimeValue = readTime?.value;

    if (!category || !title || !content || !readTimeValue || !author) {
        return response.status(400).json({ message: "Missing required fields" })
    }

    next()
}