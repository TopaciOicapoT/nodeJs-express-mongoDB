import {User} from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";

export const register = async(req, res) => {
    const {email, password} = req.body;
    try {
        // Alternativa 2 para validar, buscando por email
        // La función findOne tenemos que llamarla a traves del modelo
        let user = await User.findOne({email})
        // Al usar throw sin especificar saltamos al throw new error del final, siendo como un return, no dejando ejecutar todo lo que nos saltemos
        if (user) throw {code: 11000}
        user = new User({ email, password });
        await user.save();
        console.log(user)
        console.log(req.body)

        // Generar el tokenJWT 

        const {token, expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id, res);


        // el status 201 es una confirmación de creación que veremos por consola
        return res.status(201).json({ token, expiresIn })
    } catch (error) {
        // Alternativa 1 para validar, por defecto mongoose
        console.log(error.message)
        if(error.code === 11000){
            // El status 400 es un bad request, que indica que no se han introducido los datos adecuados o no se tiene la autorización pertinente
            return res.status(400).json({ error: "Ya existe este ususario"});
        }
        // Stataus 500 indica un error de servidor.
        return res.status(500).json({ error: "Error de servidor"})
    }


};


export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({email});
        if (!user) return res.status(403).json({ error: "No existe este ususario"});
        const respuestaPassword = await user.comparePassword(password)
        if (!respuestaPassword) 
        return res.status(403).json({ error: "Contraseña incorrecta"})
        
        // Generar token

        const {token, expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id, res);
        return res.json({ token, expiresIn});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Error de servidor"})
    }
};

export const infoUser = async(req, res) => {
    try {
        const user = await User.findById(req.uid).lean()
        return res.json({email: user.email, uid: user.id});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "error de server"})
    }
};

export const refreshToken = (req, res) => {
    try {
        const {token, expiresIn} = generateToken(req.uid)
        return res.json({ token, expiresIn});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "error de server"})
    }
};

export const logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.json({ok: true})
}
