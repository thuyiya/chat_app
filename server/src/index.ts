import 'dotenv/config';
import 'graphql-import-node'; //to import with .graphql formatted file
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from './schema.graphql';
import resolvers from './resolvers';
import context from './context';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

interface AppContext {
    authScope?: String;
}


const server = new ApolloServer<AppContext>({
    typeDefs: schema,
    resolvers
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
        context: context,
    });


    console.log(`🚀  Server ready at: ${url}`);
})()