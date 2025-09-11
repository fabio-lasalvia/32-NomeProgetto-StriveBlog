export async function validateId(request, response, next) {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "ID non valido" });
  }

  next();
}
