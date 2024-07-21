import { PrismaClient } from '@prisma/client'
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt';
import { generateToken } from './context';

const prisma = new PrismaClient()

const resolvers = {
    Query: {
        users: async (_, args, context) => {
            if (!context.isUserLoggedIn) throw new GraphQLError('UNAUTHENTICATED Action', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });

            const users = await prisma.user.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                where: {
                    id: {
                        not: context.token.userId
                    }
                }
            })
            return users
        }
    },

    Mutation: {
        signUpUser: async (_, { payload }) => {
            const user = await prisma.user.findUnique({
                where: { email: payload.email }
            })
            //error handling
            if (user) throw new GraphQLError('User is already exist', {
                extensions: {
                    code: ApolloServerErrorCode.BAD_USER_INPUT,
                    http: { status: 200 },
                },
            });

            const hashedPassword = await bcrypt.hash(payload.password, 10)

            const newUser = await prisma.user.create({
                data: {
                    ...payload,
                    password: hashedPassword
                }
            })

            return newUser
        },
        signInUser: async (_, { payload }) => {
            const user = await prisma.user.findUnique({
                where: { email: payload.email }
            })
            //error handling
            if (!user) throw new GraphQLError('Please check your credentials, Please sign Up', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });

            const doMatch = await bcrypt.compare(payload.password, user.password)

            //error handling
            if (!doMatch) throw new GraphQLError('Please check your credentials!', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });

            //generate token
            const token = generateToken({ userId: user.id })

            return { token }
        },
        createMessage: async (_, { receiverId, text }, context) => {
            if (!context.isUserLoggedIn) throw new GraphQLError('UNAUTHENTICATED Action', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });

            const message = await prisma.message.create({
                data: {
                    text,
                    receiverId,
                    senderId: context.token.userId
                }
            })

            return message
        }
    }
};

export default resolvers
