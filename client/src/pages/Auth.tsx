import { Alert, AlertColor, Box, Card, Link, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { FC, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { useMutation } from '@apollo/client'
import { LOGIN_IN_USER, SIGN_UP_USER } from '../graphql/mutations'
import { AuthProps } from '../types';

const EMPTY_AUTH_FORM = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

const Auth: FC<AuthProps> = ({ setLoggedIn }) => {

    const [showSignUp, setShowSignUp] = useState(false)
    const [alert, setAlert] = useState<{
        open: boolean,
        message: String,
        severity: AlertColor
    }>({
        open: false,
        message: '',
        severity: 'info'
    })
    const [formData, setFormData] = useState(EMPTY_AUTH_FORM)

    const [signUpUser, { loading: l1 }] = useMutation(SIGN_UP_USER, {
        onCompleted: (data) => {
            setAlert(prevState => ({
                ...prevState,
                message: `${data.firstName} ${data.lastName} was successfully registered to the system!`,
                severity: 'success',
                open: true
            }))
            resetForm()
        },

        onError: () => {
            setAlert(prevState => ({
                ...prevState,
                message: "Authentication! Failed!",
                severity: 'error',
                open: true
            }))
        }
    })
    const [loginUser, { loading : l2}] = useMutation(LOGIN_IN_USER, {
        onCompleted: (data) => {
            localStorage.setItem("token", data.auth.token)
            setLoggedIn(true)
        },

        onError: () => {
            setAlert(prevState => ({
                ...prevState,
                message: "Authentication Failed! Please double check your credentials!",
                severity: 'error',
                open: true
            }))
        }
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onSubmit = async (event: React.FormEvent<EventTarget>) => {
        event.preventDefault()
        if (showSignUp) {
            //user registration process
            signUpUser({
                variables: {
                    payload: {
                        "firstName": formData.firstName,
                        "lastName": formData.lastName,
                        "email": formData.email,
                        "password": formData.password
                    }
                }
            })
        } else {
            // user login process
            await loginUser({
                variables: {
                    "payload": {
                        "email": formData.email,
                        "password": formData.password,
                    }
                }
            })
        }
    }

    const resetForm = () => {
        setFormData(EMPTY_AUTH_FORM);
    };

    const handleCloseAlert = () => {
        setAlert({
            open: false,
            message: '',
            severity: 'info'
        })
    }

    return (
        <Box
            component={'form'}
            onSubmit={onSubmit}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'70vh'}
        >
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert
                    onClose={handleCloseAlert}
                    severity={alert.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
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
                            required
                            size='small'
                            value={formData.firstName}
                        />
                        <TextField
                            name='lastName'
                            label='Last Name'
                            variant='outlined'
                            required
                            onChange={handleChange}
                            size='small'
                            value={formData.lastName}
                        />
                    </>}
                    <TextField
                        name='email'
                        label='Email Address'
                        variant='outlined'
                        onChange={handleChange}
                        size='small'
                        type='email'
                        required
                        value={formData.email}
                    />
                    <TextField
                        name='password'
                        label='Password'
                        variant='outlined'
                        type='password'
                        onChange={handleChange}
                        size='small'
                        required
                        value={formData.password}
                    />
                    <LoadingButton
                        size="small"
                        type='submit'
                        loading={l1 || l2}
                        loadingIndicator={showSignUp ? 'Registering...' : 'Sign In...'}
                        variant="contained"
                    >
                        {showSignUp ? 'Sign Up' : 'Sign In'}
                    </LoadingButton>
                    <Link
                        component="button"
                        variant="body2"
                        type='button'
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