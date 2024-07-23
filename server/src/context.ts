import jwt, { SignOptions, Secret } from 'jsonwebtoken';

interface TokenPayload {
    userId: number;
}

export const generateToken = (payload: TokenPayload): string => {
    const options: SignOptions = {
        expiresIn: '12h' // Token expiration time
    };

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};

const verifyToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY) as TokenPayload;
    } catch (e) {
        console.error('Error verifying token:', e.message);
        throw new Error('Invalid or expired token');
    }
};

const context = async ({ req, res }) => {
    const authorization = req.headers.authorization;

    const authScope = {
        token: null,
        isUserLoggedIn: false
    };

    if (authorization) {
        const token = authorization
        try {
            const decodedToken: TokenPayload = await verifyToken(token);
            if (decodedToken) {
                authScope.token = decodedToken;
                authScope.isUserLoggedIn = true;
            }
        } catch (e) {
            console.error('Token verification failed:', e.message);
        }
    }

    return authScope;
};

export default context