export interface RegisterUser {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface AuthLogin {
    email: string
    password: string
}