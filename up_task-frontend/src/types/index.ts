import z from "zod"

export const taskStatusSchema = z.enum(["pending", "on_hold", "in_progress", "under_review", "completed"])

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    taskStatus: taskStatusSchema
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


export interface Project extends z.infer<typeof projectSchema> {}

export interface ProjectFormData extends Pick< Project, "projectName" | "clientName" | "description" > {}

export type TaskStatus = z.infer<typeof taskStatusSchema>

export interface Task extends z.infer<typeof taskSchema> {}

export interface TaskFormData extends Pick<Task, "name" | "description"> {}