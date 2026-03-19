import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardProjectsSchema, type ProjectFormData } from "@/types/index";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function getAllProjects() {
    try {
        const { data } = await api.get("/projects")
        const result = dashboardProjectsSchema.safeParse(data)
        if(result.success) return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}