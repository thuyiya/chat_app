import { Box, Button, Card, Link, Stack, TextField, Typography } from '@mui/material'
import { useRef, useState } from 'react'

const Auth = () => {
    const [showSignUp, setShowSignUp] = useState(true)
    const [fromData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault()
        console.log(fromData);

    }

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        });
    };

    return (
        <Box
            component={'form'}
            onSubmit={onSubmit}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'70vh'}
        >
            <Card
                variant='outlined'
                sx={{
                    padding: 3,
                }}
            >
                <Stack
                    flexDirection={'column'}
                    spacing={2}
                    sx={{ width: 400 }}
                    direction={'column'}

                >
                    <Typography textAlign={'center'} variant='h5' >{showSignUp ? 'Registration!' : 'Sign In!'}</Typography>
                    {showSignUp && <>
                        <TextField
                            name='firstName'
                            label='First Name'
                            variant='outlined'
                            onChange={handleChange}
                            size='small'
                            value={fromData.firstName}
                        />
                        <TextField
                            name='lastName'
                            label='Last Name'
                            variant='outlined'
                            onChange={handleChange}
                            size='small'
                            value={fromData.lastName}
                        />
                    </>}
                    <TextField
                        name='email'
                        label='Email Address'
                        variant='outlined'
                        onChange={handleChange}
                        size='small'
                        type='email'
                        value={fromData.email}
                    />
                    <TextField
                        name='password'
                        label='Password'
                        variant='outlined'
                        type='password'
                        onChange={handleChange}
                        size='small'
                        value={fromData.password}
                    />
                    <Button variant='contained' type='submit'>{showSignUp? 'Sign Up': 'Sign In'}</Button>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            setShowSignUp(prevState => !prevState);
                            resetForm()
                        }}
                    >
                        {showSignUp ? 'Tap to Sign In' : 'Don`t you have an account yet?'}
                    </Link>
                </Stack>
            </Card>
        </Box>
    )
}

export default Auth;