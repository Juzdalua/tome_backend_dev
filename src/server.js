import express from "express";
import "dotenv/config"

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 4000;

app.get("/", (req,res) => res.send("hi"));

app.listen(PORT, () => console.log(`🚀 Connect PORT: ${PORT}. ✅`) );