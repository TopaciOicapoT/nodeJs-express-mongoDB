import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator"
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = Router();

// Recuerda colocar el trim() primero para que no de error antes de quittarle los espacios
router.post("/register",
    // validación antes de que llegue al register
    [
        body('email', "formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Minimo 6 carácteres").trim().isLength({ min: 5 }),
        body("password", "formato de password incorrecto").custom(
            (value, { req }) => {
                if (value !== req.body.repassword) {
                    throw new Error('no coinciden las contraseñas')
                }
                return value
            })
    ],
    // error que viene de middlewares
    validationResultExpress,
    register);

router.post(
    "/login",
    // validación antes de que llegue al login
    [
        body('email', "formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
    ],
    // error que viene de middlewares
    validationResultExpress,
    login);

export default router;