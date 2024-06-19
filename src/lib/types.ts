export interface LoggableAccount {
    username: string;
    password: string
}

export interface RegisterableAccount extends LoggableAccount {
    email: string;
    displayName: string
}

export interface Account {
    username: string;
    email: string;
    displayName: string
}