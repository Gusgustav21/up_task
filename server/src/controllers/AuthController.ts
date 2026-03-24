import { Request, Response } from "express"
import User from "../models/User"

export default class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const user = new User(req.body)
            await user.save()

            res.send("Cuenta creada exitosamente")
        } catch (error) {
            res.status(500).json({ error: "Error creando al usuario" })
        }
    } 
}