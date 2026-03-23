import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { projectSchema, dashboardProjectsSchema, type Project, type ProjectFormData } from "@/types/index";

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

export async function getProjectById(id: Project["_id"]) {
    try {
        const { data } = await api.get(`/projects/${id}`)
        const result = projectSchema.safeParse(data)
        if(result.success) return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

interface UpdateAPIProp {
    formData: ProjectFormData,
    projectId: Project["_id"]
}

export async function updateProject({formData, projectId} : UpdateAPIProp) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function deleteProject(projectId: Project["_id"]) {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}