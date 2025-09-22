import express from "express"
import cors from "cors"
import noteRoutes from "./routes/noteRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config()

// console.log(process.env.MONGO_URL);

const app = express()

const PORT = process.env.PORT || 5001

// middleware
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
    })
)







app.use("/api/notes", noteRoutes);

connectDB()

app.listen( PORT,() => {
    console.log("Server started on PORT:", PORT)
})

// mongodb+srv://abdulmuhminsodiq_db_user:LAiWsPTSShfZg1IE@cluster0.1x0euox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0