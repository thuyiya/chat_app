# Chat App API

This is a simple chat application built using Apollo GraphQL and TypeScript.

## Project Setup

# setup with typescript
- https://www.apollographql.com/docs/apollo-server/getting-started


### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or above)
- npm (version 6 or above)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thuyiya/chat_app.git
   cd graphql-test
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Scripts

- `build`: Compiles the TypeScript code to JavaScript.
- `start`: Runs the compiled JavaScript code.
- `dev`: Starts the application in development mode with `nodemon`.

You can run these scripts using npm:

```bash
npm run build   # To build the project
npm run start   # To start the project
npm run dev     # To start the project in development mode
```

## Setup `.env`
Create `.env` and add below config to your project
```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mysql://user_name:user_password@localhost:3306/chatapp_db"
PORT=7777
JWT_SECRET_KEY="privatemykey_01293412809312h412094h102h421"
```

## Project Structure

- `src/`: Contains the TypeScript source files.
  - `index.ts`: Entry point of the application.
  - `schema.ts`: Defines the GraphQL schema.
  - `resolvers.ts`: Contains the resolver functions for the GraphQL schema.

## Running the Application

1. Start the application in development mode:

   ```bash
   npm run dev
   ```

2. The server will start on `http://localhost:4000`.

## Example GraphQL Queries

You can use the following example queries to test the application:

### Query

```graphql
query {
  messages {
    id
    content
    author
  }
}
```

### Mutation

```graphql
mutation {
  addMessage(content: "Hello, world!", author: "John Doe") {
    id
    content
    author
  }
}
```

### Generate your docs!
- ```npx spectaql config/spectaql_api_doc_config.yml```

## License

This project is licensed under the ISC License.
