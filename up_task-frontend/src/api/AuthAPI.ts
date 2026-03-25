import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { Auth, ConfirmToken, UserLoginForm, UserRegistrationForm } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const { data } = await api.post("/auth/create_account", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function confirmToken(token: ConfirmToken["token"]) {
    try {
        const { data } = await api.post("/auth/confirm_account", {token})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function requestCodeToken(email: Auth["email"]) {
    try {
        const { data } = await api.post("/auth/request_code", {email})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const { data } = await api.post("/auth/login", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}