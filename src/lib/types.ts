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

export interface Account {
    username: string;
    email: string;
    fullName: {
        firstName: string;
        lastName: string;
    }
}