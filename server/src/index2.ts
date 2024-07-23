import 'dotenv/config';
import 'graphql-import-node'; //to import with .graphql formatted file
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createServer } from 'http';
import express from 'express'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';

import typeDefs from './typeDefs.graphql';
import resolvers from './resolvers';
import { context, wsContext } from './context';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

const app = express()

// This `app` is the returned value from `express()`.
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema, context: wsContext }, wsServer);

const apolloServer = new ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});


(async () => {
    await apolloServer.start();
    app.use('/', cors<cors.CorsRequest>(), express.json(), expressMiddleware(apolloServer, {
        context: async ({ req }) => context({ req, }),
    }));
    // Now that our HTTP server is fully set up, we can listen to it.
    httpServer.listen(PORT, () => {
        console.log(`\x1b[33mHTTP on: http://localhost:${PORT}/\x1b[0m`);
        console.log(`\x1b[34mWebSocket: on ws://localhost:${PORT}/subscriptions\x1b[0m`)
    });
})()