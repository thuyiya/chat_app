import { PrismaClient } from '@prisma/client'
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'; 

const prisma = new PrismaClient()

const resolvers = {
    Query: {

    },

    Mutation: {
        signupUser: async (_, { payload }) => {
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
            const options: SignOptions = {
                expiresIn: '24h' // Token expiration time
            };

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, options)

            return { token }
        }
    }
};

export default resolvers
