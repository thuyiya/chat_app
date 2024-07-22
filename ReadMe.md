# Chat App

## Overview
Chat App is a full-stack application with a backend powered by GraphQL and a frontend built using ReactJS. This project demonstrates the integration of a GraphQL API with a modern ReactJS client.

## Project Structure
```
project-root/
│
├── api/
│ ├── .vscode/
│ ├── assets/
│ ├── config/
│ ├── dist/
│ ├── docs/
│ ├── node_modules/
│ ├── prisma/
│ ├── public/
│ ├── src/
│ ├── .env
│ ├── .gitignore
│ ├── env.d.ts
│ ├── nodemon.json
│ ├── package-lock.json
│ ├── package.json
│ ├── ReadMe.md
│ └── tsconfig.json
│
├── client/
│ ├── .vscode/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ ├── .gitignore
│ ├── package-lock.json
│ ├── package.json
│ └── README.md
│
└── package.json
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or Yarn
- MySQL

### Setting Up the Backend (API)

1. Navigate to the `api` directory:

    ```bash
    cd api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables in the `.env` file.

4. Push the Prisma schema to your database:

    ```bash
    npx prisma db push
    ```

5. Start the server:

    ```bash
    npm start
    ```

### Setting Up the Frontend (Client)

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the client:

    ```bash
    npm start
    ```

### Running Both API and Client Together

If you have a root-level `package.json` with scripts to run both the API and client, you can start both simultaneously using:

```bash
npm start
```

## Technologies Used
- Backend: Node.js, GraphQL, Apollo Server, Prisma, MySQL
- Frontend: ReactJS, Apollo Client

## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any questions or suggestions, please contact thusitha.4t@gmail.com.
