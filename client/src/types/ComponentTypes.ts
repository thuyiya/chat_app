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
export interface HomeProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
export interface SideBarProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
