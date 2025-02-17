import express from 'express';
import {PORT} from './config/env.js';
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.router.js";
import cors from "cors";


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true // Allow cookies in cross-origin requests
}));

// Routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);


app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to Clinic Management API</h1>')
});

app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Clinic Management API running on http://localhost:${PORT}.`)
});

export default app;
