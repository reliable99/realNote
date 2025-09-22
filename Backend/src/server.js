import express from "express"
import cors from "cors"
import noteRoutes from "./routes/noteRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import path from "path"

dotenv.config()

// console.log(process.env.MONGO_URL);

const app = express()

const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

// middleware
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
    })
)


app.use("/api/notes", noteRoutes);

app.use(express.static(path.join(__dirname,"../Frontend/dist")))

 if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}




connectDB()

app.listen( PORT,() => {
    console.log("Server started on PORT:", PORT)
})

// mongodb+srv://abdulmuhminsodiq_db_user:LAiWsPTSShfZg1IE@cluster0.1x0euox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0