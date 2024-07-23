import { AppBar, Avatar, Box, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import SendIcon from '@mui/icons-material/Send';

import MessageBubble from "./MessageBubble"
import { GET_MESSAGES_BY_USER } from "../graphql/queries"
import { Message } from "../types"
import { CREATE_MESSAGE } from "../graphql/mutations"

const Chat = () => {
    const { id, name } = useParams()
    const [text, setText] = useState("")
    const [messages, setMessages] = useState<Message[]>([])

    const { data, loading, error } = useQuery(GET_MESSAGES_BY_USER, {
        variables: {
            receiverId: Number(id)
        },
        onCompleted: (data) => {
            setMessages(data?.messages || [])
        }
    })
    const [createMessage] = useMutation(CREATE_MESSAGE, {
        onCompleted(data) {
            if (data.createMessage) {
                setMessages(prevState => ([
                    ...prevState,
                    data.createMessage
                ]))
            }
        }
    })

    const sendMessage = () => {
        createMessage({
            variables: {
                "receiverId": Number(id),
                "text": text
            }
        })
        setText("")
    }

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
                    direction: item.receiverId == Number(id) ? 'end' : 'start'
                }}
            />)}
        </Box>
        <Stack
            direction={'row'}
            p={1}
        >
            <TextField
                placeholder="Type your message.."
                variant='standard'
                fullWidth
                multiline
                rows={2}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <IconButton onClick={() => sendMessage()}>
                <SendIcon fontSize="large" />
            </IconButton>
        </Stack>
    </Box>)
}

export default Chat