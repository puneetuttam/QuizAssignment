import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import cors from 'cors'; // Import cors
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from frontend (localhost:5173)
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials such as cookies
},{
    origin:'http://localhost:5174/',
    credentials:true,
}));

// Middleware
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json()); // To parse JSON bodies
// app.use(cookieParser()); // Uncomment if using cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

// Connect to MongoDB and start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
