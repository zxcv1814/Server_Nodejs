import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
interface DecodedToken extends JwtPayload {
    email: string;
}

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or incorrect format' });
    }

    const token = authHeader.slice(7);

    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }

    jwt.verify(token, 'secret', (err: JsonWebTokenError | null, decoded: JwtPayload | string | undefined) => {
        if (err || !decoded) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = decoded as DecodedToken;
        next();
    });
};
