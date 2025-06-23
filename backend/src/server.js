import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
dotenv.config()

const app=express();

const PORT=process.env.PORT || 5001

connectDB();

// console.log(process.env.MONGO_URI);
// console.log(process.env.PORT);
app.use(express.json());

app.use(rateLimiter);


app.use("/api/notes",notesRoutes);

app.listen(PORT,()=>{
    console.log("Server started on PORT:",PORT);
});

