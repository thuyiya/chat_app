import { Box, Divider, Typography } from "@mui/material"
import UserCard from "./UserCard"
import { User } from "../types"

const SideBar = () => {

    const users: User[] = [{
        id: 1,
        firstName: 'Kumara',
        lastName: 'Sangakkara',
    }, {
        id: 2,
        firstName: 'John',
        lastName: 'Lock',
    }, {
        id: 3,
        firstName: 'Wild',
        lastName: 'Booo',
    }]

    return (<Box
        bgcolor={'#f0f0f0'}
        height={'100vh'}
        width={200}
        padding={1}
    >
        <Typography variant="h6">Chat</Typography>
        <Divider />
        {
            users.map(item => {
                return <UserCard
                    key={item.id}
                    item={item}
                />
            })
        }
    </Box>)
}

export default SideBar