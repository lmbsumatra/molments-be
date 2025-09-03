import { connectDB } from "../config/database"
import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import userRoutes from "../routes/user.route"

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`App running on ${process.env.PORT}`)
    })
})