import { User, Message } from "./DataTypes";

export interface UserCardProps {
    item: User;
}
export interface MessageProps {
    item: Message;
}
export interface AuthProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
