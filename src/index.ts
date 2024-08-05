// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;

mongoose
    .connect(process.env.CONNECTION_STRING as string)
    .then(() => {
        console.log(`Connected to MongoDB ${process.env.ENV} Database`);
        //create();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



app.get("/", (req: Request, res: Response) => {
    res.send("Simplecyber Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});