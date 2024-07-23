# Apollo Server Subscriptions with Authentication

## Overview

Apollo Server subscriptions use WebSocket connections to enable real-time, bidirectional communication between the client and server. This allows clients to receive updates when data changes without needing to continuously poll the server.

## Basic Steps for Setting Up Apollo Server Subscriptions

1. **Define Your Schema**: Include a subscription type in your GraphQL schema.
2. **Set Up the WebSocket Server**: Create a WebSocket server and connect it with Apollo Server.
3. **Configure the Apollo Server**: Integrate subscriptions with Apollo Server.
4. **Handle Authentication**: Implement authentication logic to secure the subscription connections.

## Example Setup

### 1. Define Your Schema

Include a subscription type in your GraphQL schema:

```graphql
# schema.graphql
type Message {
  id: ID!
  content: String!
}

type Query {
  messages: [Message]
}

type Mutation {
  sendMessage(content: String!): Message
}

type Subscription {
  messageSent: Message
}
```

### 2. Set Up the WebSocket Server
Use `graphql-ws` for handling WebSocket connections:

```javascript
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = /* GraphQL */ `
  type Message {
    id: ID!
    content: String!
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    sendMessage(content: String!): Message
  }

  type Subscription {
    messageSent: Message
  }
`;

const resolvers = {
  Query: {
    messages: () => { /* Fetch messages */ },
  },
  Mutation: {
    sendMessage: (parent, { content }) => {
      // Logic to send message and publish to subscription
    },
  },
  Subscription: {
    messageSent: {
      subscribe: (parent, args, context) => {
        // Authentication check
        if (!context.user) throw new Error('Not authenticated');
        // Return an AsyncIterator for the subscription
      },
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
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

await server.start();
app.use('/graphql', express.json(), server.getMiddleware());

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
```

### 3. Handle Authentication

Add authentication to your context function:

```javascript 
const context = async ({ req }) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  let user = null;
  try {
    // Verify token and fetch user
    user = await verifyToken(token);
  } catch (err) {
    throw new Error('Authentication failed');
  }

  return { user };
};
```

## Key Points

- Subscription Type: Define a Subscription type in your GraphQL schema.
- WebSocket Server: Use graphql-ws to manage WebSocket connections.
- Authentication: Check authentication within your subscription resolver or context.

This setup allows clients to subscribe to real-time updates while ensuring that only authenticated users can access the subscriptions.

[For access full document](https://www.apollographql.com/docs/apollo-server/data/subscriptions)