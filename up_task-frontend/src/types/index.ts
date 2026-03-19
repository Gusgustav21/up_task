import z from "zod"

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
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