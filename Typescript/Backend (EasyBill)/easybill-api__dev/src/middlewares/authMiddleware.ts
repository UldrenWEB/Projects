import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import getEnvPath from '../utils/getEnvPath';
import message from '../json/messages.json'

const envPath = getEnvPath();
dotenv.config({ path: envPath });

/**
 * Middleware function to authenticate requests using JWT token.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers['authorization'] || '';

    if (!token) return res.status(401).json({ message: message.error.Unhautorized });

    const tokenValue = token.split(' ')[1];

    try {
        jwt.verify(tokenValue, process.env.JWT_SECRET as jwt.Secret, (error: any, decodedToken: any) => {
            if (error) return res.status(401).json({ message: message.error.InvalidToken });
            (req as any).user = decodedToken.userId;

            return next();
        });
        return;
    } catch (error: any) {
        return res.status(500).json({ message: { code: 1, description: error.message } });
    }
}

export default authMiddleware;