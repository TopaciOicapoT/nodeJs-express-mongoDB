// TODO LO QUE HAY DENTRO DE LOS AECHIVOS MODELS USAN LAS FUNCIONES DE MONGOOSE

import bcryptjs from "bcryptjs";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        requiered: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true},

    },
    password: {
        type: String,
        required: true,
    },
});

// Aqui el pre lo que hace es meterle un hash unico al usuario
userSchema.pre("save", async function (next) {
    const user = this;

    if(!user.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error)
        throw new Error('Falló el hash de contraseña')
        
    }
})

// Creamos una función dentro de userSchema
userSchema.methods.comparePassword = async function(canditatePassword){
    return await bcryptjs.compare(canditatePassword, this.password)
};

export const User = mongoose.model("User", userSchema);
