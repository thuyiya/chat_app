import { gql } from '@apollo/client';

export const MESSAGE_SUB = gql`
    subscription MessageAdded {
        newMessage: messageAdded {
            text
            senderId
            receiverId
            id
            createdAt
        }
    }
`;