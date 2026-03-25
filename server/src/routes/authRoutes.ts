import { Router } from "express"
import AuthController from "../controllers/AuthController"
import { body } from "express-validator"
import { handleInputErrors } from "../middleware/validation"

const router = Router()

router.post("/create_account",

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

router.post("/confirm_account",
    body("token").notEmpty().withMessage("El nombre no puede estar vacío")
                .isLength({min: 6}).withMessage("La contraseña debe tener mínimo 8 caracteres")
                .isAlphanumeric().withMessage("El token solo contiene números"),
    
    handleInputErrors,

    AuthController.confirmAccount
)

router.post("/login",
    
    body("password").notEmpty().withMessage("La contraseña no puede estar vacía"),

    body("email").isEmail().withMessage("El correo no es válido"),

    handleInputErrors,

    AuthController.loginAccount
)

router.post("/request_code",

    body("email").isEmail().withMessage("El correo no es válido"),

    handleInputErrors,

    AuthController.requestConfirmAccount
)

export default router