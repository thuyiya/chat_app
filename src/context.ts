import jwt, { SignOptions, Secret } from 'jsonwebtoken';

interface TokenPayload {
    userId: number;
}

export const generateToken = (payload: TokenPayload): string => {
    const options: SignOptions = {
        expiresIn: '1h' // Token expiration time
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
            console.log('Received token:', decodedToken);

            if (decodedToken) {
                authScope.token = decodedToken;
                authScope.isUserLoggedIn = true;
            }
        } catch (e) {
            console.error('Token verification failed:', e.message);
            // Optionally, you could handle specific errors here or log them
        }
    }

    return authScope;
};

export default context