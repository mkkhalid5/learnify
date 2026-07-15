export type RegisterFormData = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    image: string
}

export type LoginFormData = {
    email: string,
    password: string
}

export type RegisterErrors = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type LoginErrors = {
    email: string;
    password: string;
};