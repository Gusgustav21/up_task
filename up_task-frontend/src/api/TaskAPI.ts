import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardTasksSchema, type Project, type TaskFormData } from "../types";

interface TaskAPIData {
    taskData: TaskFormData,
    projectId: Project["_id"]
}

export async function createTask({taskData, projectId}: TaskAPIData) {
    try {
        const { data } = await api.post<string>(`/projects/${projectId}/tasks`, taskData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function getAllTasksFromProject(projectId: Project["_id"]) {
    try {
        const { data } = await api.get(`/projects/${projectId}/tasks`)
        const result = dashboardTasksSchema.safeParse(data)
        console.log(result)
        if(result.success) return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function getTaskById(projectId: string, taskId: string) {
    
}