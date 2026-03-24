import { Router } from "express"
import AuthController from "../controllers/AuthController"
import { body } from "express-validator"
import { handleInputErrors } from "../middleware/validation"

const router = Router()

router.get("/",

    body("name").notEmpty().withMessage("El nombre no puede estar vacío"),

    body("password").isLength({min: 8}).withMessage("La contraseña debe tener mínimo 8 caracteres"),

    body("password_confirmation").custom((value, {req}) => {
        if( value !== req.body.password ) {
            throw new Error("Las contraseñas no son iguales")
        } else {
            return true
        }
    }),

    body("email").isEmail().withMessage("El correo no es válido"),

    handleInputErrors,

    AuthController.createAccount
)

export default router