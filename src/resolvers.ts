import { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

const resolvers = {
    Query: {

    },

    Mutation: {
        signupUser: async (_, { payload }) => {
            const user = await prisma.user.findUnique({
                where: { email: payload.email }
            })

            if (user) throw new GraphQLError('User is already exist', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
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
        }
    }
};

export default resolvers
