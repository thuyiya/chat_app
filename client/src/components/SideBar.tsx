import { Box, Divider, IconButton, Stack, Typography } from "@mui/material"
import UserCard from "./UserCard"
import { SideBarProps, User } from "../types"
import { LoginOutlined } from "@mui/icons-material"
import { FC } from "react"
import { GET_ALL_USERS } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const SideBar: FC<SideBarProps> = ({ setLoggedIn }) => {

    const { loading, error, data } = useQuery(GET_ALL_USERS);
    
    const users: User[] = data?.users || []

    return (<Box
        bgcolor={'#f0f0f0'}
        height={'100vh'}
        width={200}
        padding={1}
    >
        {/* handle error with fetching */}
        {error && <Typography>Error: {error?.message}</Typography>}
        <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        >
            <Typography variant="h6">Chat</Typography>
            <IconButton onClick={() => {
                localStorage.removeItem('token')
                setLoggedIn(false)
            }}>
                <LoginOutlined />
            </IconButton>
        </Stack>
        <Divider />
        {loading && <Typography>Loading Users...</Typography>}
        {
            users.map((item: User) => {
                return <UserCard
                    key={item.id}
                    item={item}
                />
            })
        }
    </Box>)
}

export default SideBar