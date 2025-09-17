import mongoose from "mongoose"
import "dotenv/config"

export async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_CONNECTION_URI)
    console.log(`DB connesso: ${connection.connection.name}`)
  } catch (error) {
    console.error("Errore connessione DB:", error)
  }
}
