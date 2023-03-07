import { validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    // para autoimportar pulsamos Ctrl+space y nos dara la opción de importar el método
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next()
}