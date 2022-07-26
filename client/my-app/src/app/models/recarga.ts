import { IUser } from "./user";

export interface IRecarga{

    id: string;
    title: string;
    price: string;
    description: string;
    category: string;
    attendees: IAttendee[];
}

export interface IAttendee {
    username : string;
    displayName: string;
    image: string;
    isHost: boolean;
    state: string;
    refunded: boolean;
    dateBought: Date;
    appUserId: string;
    appUser: IUser
    recarga: IRecarga
}