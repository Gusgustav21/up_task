import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { ConfirmToken, ForgotPasswordForm, NewPasswordData, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const { data } = await api.post("/auth/create_account", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function confirmToken(token: ConfirmToken) {
    try {
        const { data } = await api.post("/auth/confirm_account", token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function requestCodeToken(email: RequestConfirmationCodeForm) {
    try {
        const { data } = await api.post("/auth/request_code", email)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const { data } = await api.post<string>("/auth/login", formData)
        localStorage.setItem("AUTH_DATA", data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function requestResetPasswordToken(email: ForgotPasswordForm) {
    try {
        const { data } = await api.post("/auth/forgot_password", email)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function validateNewPasswordToken(token: ConfirmToken) {
    try {
        const { data } = await api.post("/auth/validate_token", token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function updatePassword(formData: NewPasswordData) {
    try {
        const { data } = await api.post(`/auth/update_password/${formData.token}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

export async function getUser() {
    try {
        const { data } = await api.get("/auth/user")
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}