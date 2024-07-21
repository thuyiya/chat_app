import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

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
        context: context,
    });


    console.log(`🚀  Server ready at: ${url}`);
})()