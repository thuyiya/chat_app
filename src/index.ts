import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { randomUUID } from 'crypto';

const PORT = 7777


const users = [
    {
        "id": "1",
        "email": "john.doe@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "password": "password123"
    },
    {
        "id": "2",
        "email": "jane.smith@example.com",
        "firstName": "Jane",
        "lastName": "Smith",
        "password": "securepass456"
    }
]

const typeDefs = `#graphql
    type Query {
        users: [User]
        user(id: ID!): User
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type Mutation {
        createUser(payload: UserInput!): User
    }

    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
    }
`;

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(item => item.id == id) 
    },
    Mutation: {
        createUser: (_, { payload }) => {
            const newUser = {
                id: randomUUID(),
                ...payload,
            }

            users.push(newUser)

            return newUser
        }   
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
    });

    console.log(`🚀  Server ready at: ${url}`);
})()