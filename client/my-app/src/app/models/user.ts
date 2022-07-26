export interface IUser{

    username: string;
    displayName: string;
    token: string;
    image?: string;
    email: string;
    id: string;
}

export interface IUserFormValues{
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}