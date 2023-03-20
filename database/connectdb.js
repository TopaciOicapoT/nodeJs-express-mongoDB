import mongoose from "mongoose";
import * as dotenv from 'dotenv';
mongoose.set('strictQuery', false);
dotenv.config()

// usamos mongoose.conenect
try {
    await mongoose.connect(process.env.URI_MONGO); 
    console.log("Connect DB ok 👌")
} catch (error) {
    console.log(process.env.URI_MONGO)

    
    console.log("Error de conexión: "+ error)
    
}

