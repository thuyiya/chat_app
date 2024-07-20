import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const PORT = 7777


const users = [
    {
        "id": 1,
        "email": "john.doe@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "password": "password123"
    },
    {
        "id": 2,
        "email": "jane.smith@example.com",
        "firstName": "Jane",
        "lastName": "Smith",
        "password": "securepass456"
    },
    {
        "id": 3,
        "email": "alice.johnson@example.com",
        "firstName": "Alice",
        "lastName": "Johnson",
        "password": "alicepass789"
    },
    {
        "id": 4,
        "email": "bob.brown@example.com",
        "firstName": "Bob",
        "lastName": "Brown",
        "password": "bobbrown001"
    },
    {
        "id": 5,
        "email": "eve.davis@example.com",
        "firstName": "Eve",
        "lastName": "Davis",
        "password": "evepassword002"
    }
]



const typeDefs = `#graphql
    type Query {
        users: [User]
        user(id: ID!): User
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
        user: (parent, { id }, context) => users.find(item => item.id == id) 
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
    });

    console.log(`🚀  Server ready at: ${url}`);
})()