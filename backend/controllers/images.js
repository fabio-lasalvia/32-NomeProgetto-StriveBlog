import mailer from "../helpers/mailer.js";
import Post from "../models/Post.js";

export async function uploadImage(req, res, next) {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Nessun file caricato" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { cover: req.file.path },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post non trovato" });
    }

    await mailer.sendMail({
      from: "Assistenza Strive Blog",
      to: updatedPost.author,
      subject: `Cambio immagine del post "${updatedPost.title}"`,
      text: `Ciao, l'immagine del tuo post "${updatedPost.title}" è stata aggiornata.`,
      html: `
        <h1>Modifica immagine</h1>
        <p>L'immagine del tuo post <strong>${updatedPost.title}</strong> è stata aggiornata con successo.</p>
        <img src="${updatedPost.cover}" alt="Nuova immagine" width="300"/>
      `,
    });

    res.status(200).json({
      message: "Immagine caricata con successo",
      post: updatedPost,
    });
  } catch (error) {
    next(error);
  }
}
