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

const todos = [
    {
        "title": "Buy groceries",
        "by": "1"
    },
    {
        "title": "Finish project report",
        "by": "2"
    },
    {
        "title": "Schedule meeting with team",
        "by": "1"
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
        todos: [Todo]
    }

    type Todo {
        title: String!
        by: ID!
    }
`;

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }, { authScope }) => {
            
            if (!authScope.isLoggedInUser) throw new Error("Your are not logged in")

            return users.find(item => item.id == id) 
        }
    },
    User: {
        todos: ({ id }) => {
            return todos.filter(todo => todo.by == id)
        }
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

interface AppContext {
    authScope?: String;
}


const server = new ApolloServer<AppContext>({
    typeDefs,
    resolvers
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
        context: async ({ req, res }) => ({
            authScope: {
                isLoggedInUser: true
            },
        }),
    });


    console.log(`🚀  Server ready at: ${url}`);
})()