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

    input UserSignInInput {
        email: String!
        password: String!
    }

    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
    }

    type Token {
        token: String!
    }

    type Mutation {
        signupUser(payload: UserInput!):User
        signInUser(payload: UserSignInInput!): Token
    }
`;

export default typeDefs