export interface Account {
    username: string;
    email: string;
    displayName: string;
    imgUrl: string;
    bio: string;
}

export interface AccountWithID extends Account {
    id: string;
}