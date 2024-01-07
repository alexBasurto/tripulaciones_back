import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import router from "./routes/router.js";

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
}

app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
        secure:false,
        maxAge: 1000 * 60 * 20
    }
}))

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use("/", router);

app.listen(process.env.APP_PORT, () => console.log('\x1b[42m%s\x1b[0m', `Servidor web en marcha en puerto ${process.env.APP_LOCAL_PORT}.`));

