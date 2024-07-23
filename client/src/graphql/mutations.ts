import { gql } from '@apollo/client';

export const SIGN_UP_USER = gql`
    mutation SignupUser($payload: UserInput!) {
        signUpUser(payload: $payload) {
            id
            firstName
            lastName
            email
        }
    }
`

export const LOGIN_IN_USER = gql`
    mutation SignInUser($payload: UserSignInInput!) {
        auth: signInUser(payload: $payload) {
            token
        }
    }
`

export const CREATE_MESSAGE = gql`
    mutation CreateMessage($receiverId: Int!, $text: String!) {
        createMessage(receiverId: $receiverId, text: $text) {
            id
            text
            receiverId
            senderId
            createdAt
        }
    }
`