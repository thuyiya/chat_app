import { AppBar, Avatar, Box, TextField, Toolbar, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useParams } from "react-router-dom"
import Message from "./Message"
import { useEffect, useState } from "react"

const Chat = () => {
    const { name } = useParams()
    const [messages, setMessages] = useState([])

    const fetchAllMessages = async () => {
        try {
            const response = await fetch('http://localhost:7777/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcyMTcxMzc1NiwiZXhwIjoxNzIxNzU2OTU2fQ.jHQ-0cvjfIKoFWZKsms4Qi-KB8HmeuB0bhmLgLXcIP8"
                },
                body: JSON.stringify({
                    query: `
                        query MessagesByUser($receiverId: Int!) {
                            messages: messagesByUser(receiverId: $receiverId) {
                                text
                                senderId
                                receiverId
                                id
                                createdAt
                            }
                        }
                    `,
                    variables: {
                        receiverId: 3
                    }
                })
            })

            const { data } = await response.json()

            setMessages(data.messages || []);
            
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchAllMessages()
    }, [])

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
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'start' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />
            <Message item={{ id: 1, text: 'Hi bro', date: '11:00am', direction: 'end' }} />

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