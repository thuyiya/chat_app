import { Box, Divider, Stack, Typography } from "@mui/material"
import UserCard from "./UserCard"
import { User } from "../types"
import { LoginOutlined } from "@mui/icons-material"

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
        <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        >
            <Typography variant="h6">Chat</Typography>
            <LoginOutlined />
        </Stack>
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