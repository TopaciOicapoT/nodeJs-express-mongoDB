import jwt from 'jsonwebtoken'
// Muy importante que al importar pongamos el tipo de archivo del que viene, en este caso .js
import { tokenVerificationErrors } from '../utils/generateToken.js';

export const requiereToken = (req, res, next) => {

    try {
        console.log(req.headers)
        let token = req.headers?.authorization;
        console.log(token)
        if (!token) 
        throw new Error('No existe el token, el header usa Bearer')
            token = token.split(" ")[1];
            const {uid} = jwt.verify(token, process.env.JWT_SECRET)


           req.uid = uid
        // Este next() hace que en routes despues de pasar esta función pase a la siguiente de las rutas, que en este caso es infoUser
        next();
    } catch (error) {
        console.log(error.message)

        return res
        .status(401)
        .send({ error: tokenVerificationErrors [error.message]});
    }
}