import mongoose from "mongoose";

const {Schema, model} = mongoose;

const linkSchema = new Schema({
    longLink: {
        type: String,
        requiered: true,
        trim: true,
    },
    nanoLink: {
        type: String,
        requiered: true,
        trim: true,
        unique: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requiered: true,
    },
});

// Al indicarle a link que es un modelo podemos usar las funciones de mongoose como por ejemplo .findOne({})
export const Link = model('link', linkSchema)