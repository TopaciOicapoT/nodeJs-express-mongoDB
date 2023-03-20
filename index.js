import cors from "cors"
import express from 'express';
import * as dotenv from 'dotenv';
import "./database/connectdb.js";
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";
dotenv.config();

const app = express();
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]
app.use(cors({
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            return callback(null, origin)
        }
        return callback(
            `Error de CORS origin: ${origin} No autorizado!`
            )
        
        
    },
}))
app.use(express.json())
app.use(cookieParser())

// Ejemplo de back redirect
app.use("/", redirectRouter);

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/links", linkRouter)

// ejemplo en un html, usamos esta ruta para crear la página visible y pública

app.use(express.static("public"));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("👌 http://localhost:"+ PORT));
