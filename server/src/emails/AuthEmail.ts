import { transporter } from "../config/nodemailer"
import type { IUser } from "../models/User"

interface IEmail {
    email: IUser["email"],
    name: IUser["name"],
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async ({email, name, token}: IEmail) => {
        await transporter.sendMail({
            from: "Up Task <admin@uptask.com>",
            to: email,
            subject: "Up Task - Confirma tu cuenta",
            text: "Up Task - Confirma tu cuenta",
            html: `<p>Hola ${name}!</p>
                   <p>Ya casi está lista tu cuenta en Up Task</p>
                   <p>Confirma tu cuenta entrando al siguiente enlace <a href="${process.env.FRONTEND_URL + "/auth/confirm_account"}">Confirmar cuenta</a> </p>
                   <p>E ingrese el siguiente token: <b>${token}</b></p>
                   <p>Este Token expira en 10 minutos</p>`
        })
    }
}