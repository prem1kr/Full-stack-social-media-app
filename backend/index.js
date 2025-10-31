import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.URL, // frontend origin 
    credentials: true,
};
app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
});

server.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at port ${PORT}`);
});
