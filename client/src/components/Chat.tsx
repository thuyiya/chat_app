import { AppBar, Avatar, Box, TextField, Toolbar, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useParams } from "react-router-dom"
import MessageBubble from "./MessageBubble"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_MESSAGES_BY_USER } from "../graphql/queries"
import { Message } from "../types"

const Chat = () => {
    const { id, name } = useParams()
    const { data, loading, error } = useQuery(GET_MESSAGES_BY_USER, {
        variables: {
            receiverId: Number(id)
        }
    })

    const messages: Message[] = data?.messages || []


    return (<Box
        flexGrow={1}
    >
        <AppBar position='static' sx={{
            backgroundColor: 'white',
            boxShadow: 0
        }}>
            <Toolbar>
                <Avatar
                    src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${name}`}
                    sx={{
                        width: 32,
                        height: 32,
                        bgcolor: grey[400],
                        mr: 1
                    }}
                />
                <Typography variant='h6' color={'black'} >{name}</Typography>
            </Toolbar>
        </AppBar>
        <Box
            bgcolor={'#f5f5f5'}
            height={'80vh'}
            padding={1}
            sx={{
                overflowY: 'auto'
            }}
        >
            {loading && <Typography variant="h6" >Loading...</Typography>}
            {messages.map(item => <MessageBubble 
            key={item.id} 
                item={{
                    ...item,
                    direction: item.receiverId == Number(id) ? 'end': 'start'
                }} 
            />)}
        </Box>
        <TextField
            placeholder="Type your message.."
            variant='standard'
            fullWidth
            multiline
            rows={2}
        />
    </Box>)
}

export default Chat