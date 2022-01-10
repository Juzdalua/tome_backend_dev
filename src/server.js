import express from "express";
// const express = require("express");

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 4000;

app.get("/", (req,res) => res.render("hi"));

app.listen(PORT, () => console.log(`🚀 Connect PORT: ${PORT}. ✅`) );