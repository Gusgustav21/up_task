import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardTasksSchema, taskSchema, type Project, type Task, type TaskFormData, type TaskStatus } from "../types";

interface TaskAPIData {
    taskData: TaskFormData,
    projectId: Project["_id"],
    taskId: Task["_id"],
    taskStatus: TaskStatus
}

export async function createTask({taskData, projectId}: Pick<TaskAPIData, "taskData" | "projectId">) {
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

export async function getTaskById({ projectId, taskId }: Pick<TaskAPIData, "taskId" | "projectId">) {
    try {
        const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`)
        const result = taskSchema.safeParse(data)
        if(result.success) return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function updateTask({taskData, projectId, taskId} : Pick<TaskAPIData, "taskData" | "projectId" | "taskId">) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}/tasks/${taskId}`, taskData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function deleteTask({ taskId, projectId }: Pick<TaskAPIData, "taskId" | "projectId">) {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}/tasks/${taskId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function changeStatusTask({ taskId, projectId, taskStatus }: Pick<TaskAPIData, "taskId" | "projectId" | "taskStatus">) {
    try {
        const { data } = await api.patch<string>(`/projects/${projectId}/tasks/${taskId}`, {taskStatus})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}