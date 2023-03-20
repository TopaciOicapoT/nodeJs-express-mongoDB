import { body, param, validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    // para autoimportar pulsamos Ctrl+space y nos dara la opción de importar el método
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
};

export const paramLinkValidator = [
    param("id", "Formato link incorrecto (expressValidator)")
    .trim()
    .notEmpty()
    .escape()
    ,validationResultExpress,
]

export const bodyLinkValidator = [
    body("longLink", "formato link incorrecto" )
    .trim()
    .notEmpty()
    // .exists()
    .custom(async (value) => {
        try {
            if(!value.startsWith("https://")){
                value = "https://" + value;
                console.log(value)
            }else{
                console.log(value)

                await fetch(value);
                console.log("########XDXDXD##########")
                return value;
            }
        } catch (error) {
            // console.log(error)
            throw new Error("not found longLink 404")
        }
    })
    ,
    validationResultExpress,
];

export const bodyRegisterValidator =
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
            }),
        validationResultExpress
    ];

export const bodyLoginValidator =     
// validación antes de que llegue al login
[
    body('email', "formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    validationResultExpress,
];



