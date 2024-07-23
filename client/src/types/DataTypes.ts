import { ID } from "./CommonTypes";

export interface User {
    id: ID;
    firstName: string;
    lastName: string;
}
export interface Message {
    id: ID;
    text: string;
    date: string;
    direction: 'start' | 'end'
}