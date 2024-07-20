import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const PORT = 7777

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