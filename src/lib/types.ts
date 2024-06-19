export interface LoggableAccount {
    username: string;
    password: string
}

export interface RegisterableAccount extends LoggableAccount {
    email: string;
    fullName: {
        firstName: string;
        lastName: string;
    };
}