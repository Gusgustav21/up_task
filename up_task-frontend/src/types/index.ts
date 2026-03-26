import z from "zod"

export const taskStatusSchema = z.enum(["pending", "on_hold", "in_progress", "under_review", "completed"])

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    taskStatus: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string()
})

export const dashboardTasksSchema = z.array(
    taskSchema.pick({
        _id: true,
        name: true,
        description: true,
        taskStatus: true,
    })
)

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskSchema)
})

export const dashboardProjectsSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
    })
)

export const authSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

export interface Auth extends z.infer<typeof authSchema> {}

export interface ConfirmToken extends Pick<Auth, "token"> {}

export interface NewPasswordToken extends ConfirmToken {}

export interface NewPasswordForm extends Pick<Auth, "password" | "password_confirmation"> {}

export interface NewPasswordData extends NewPasswordForm {token: string}

export interface UserLoginForm extends Pick<Auth, "email" | "password"> {}

export interface RequestConfirmationCodeForm extends Pick<Auth, "email"> {}

export interface ForgotPasswordForm extends RequestConfirmationCodeForm {}

export interface UserRegistrationForm extends Pick<Auth, "name" | "email" | "password" | "password_confirmation"> {}

export interface UserLoginForm extends Pick<Auth, "email" | "password"> {}

export interface Project extends z.infer<typeof projectSchema> {}

export interface ProjectFormData extends Pick< Project, "projectName" | "clientName" | "description" > {}

export type TaskStatus = z.infer<typeof taskStatusSchema>

export interface Task extends z.infer<typeof taskSchema> {}

export interface TaskFormData extends Pick<Task, "name" | "description"> {}