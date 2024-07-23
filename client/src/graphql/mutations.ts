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