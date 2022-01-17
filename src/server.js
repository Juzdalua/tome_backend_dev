import express from "express";
import "dotenv/config"
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import nocache from "nocache";

import init from "./routes/index"

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 4001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//origin - cors
app.use(cors());
//GET, POST ... MOTHOD enable
app.options('*', cors());

app.use(nocache()); // show headers
app.use(helmet());

app.use(function (req, res, next) {
    var origin = '*'; //Default Origin
    if (req.headers.origin) 
        origin = req.headers.origin;
    
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Token, Timestamp, X-Requested-With, Authorization'
    );
    res.header('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

//router
init(app);


app.listen(PORT, () => console.log(`🚀 Connect PORT: ${PORT}. ✅`) );