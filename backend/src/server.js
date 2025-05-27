import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import "dotenv/config";
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import path from "path"




const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve()

app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials: true, //allow frontend to send cookies

    }
))
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html" ))
    })

}



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to DB:', err);
});