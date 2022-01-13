import express from "express";
import "dotenv/config"
import bodyParser from "body-parser";
import init from "./routes/index"

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 4001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

init(app);


app.listen(PORT, () => console.log(`🚀 Connect PORT: ${PORT}. ✅`) );