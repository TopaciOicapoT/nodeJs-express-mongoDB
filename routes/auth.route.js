import { Router } from "express";
import { infoUser } from "../controllers/auth.controller.js";
import { requiereToken } from "../middlewares/requiereToken.js";
import { requiereRefreshToken } from "../middlewares/requiereRefreshToken.js";
import { login, register, refreshToken, logout } from "../controllers/auth.controller.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatiorManager.js";
const router = Router();

// Recuerda colocar el trim() primero para que no de error antes de quittarle los espacios
router.post("/register", bodyRegisterValidator, register); 
router.post("/login", bodyLoginValidator, login);


// Al hacer los next() le vamos dando permiso para que pase de una función a otar antes de pasar a la ruta, asi si no existe el token de identificación no dejaarioamos pasar al usuario a la siguiente ruta
router.get('/protected', requiereToken, infoUser);
router.get("/refresh", requiereRefreshToken, refreshToken)
router.get("/logout", logout)

export default router;