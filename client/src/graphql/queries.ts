import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query getAllUsers {
        users {
            id
            firstName
            lastName
            email
        }
    }
`;

export const GET_MESSAGES_BY_USER = gql`
    query MessagesByUser($receiverId: Int!) {
        messages: messagesByUser(receiverId: $receiverId) {
            text
            senderId
            receiverId
            id
            createdAt
        }
    }
`;