import { connectDB } from "../src/config/database"
import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import userRoutes from "../src/routes/user.route"

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes);

app.get("/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

connectDB().then(() => {
    console.log("✅ Connected to DB??????/");
})