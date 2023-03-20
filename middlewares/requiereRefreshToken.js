//  si no ponemos la extension .js nos dara este error => 
//   node:internal/errors:484 ErrorCaptureStackTrace(err);
import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/generateToken.js";


export const requiereRefreshToken = (req, res, next) => { 
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!refreshTokenCookie) throw new Error('No existe el token, el header usa Bearer');
        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        req.uid = uid
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: tokenVerificationErrors[error.message]})
    }
 }