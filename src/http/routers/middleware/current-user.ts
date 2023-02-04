import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { authenticationService } from '../../../app/services/auth';

declare global {
    interface JwtPayload {
        email: string,
        userId: string
    }

    namespace Express {
        interface Request {
            currentUser?: JwtPayload
        }
    }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers['authorization']) {
        const error = new Error("Not Auth") as CustomError;
        error.status = 401;
        return next(error)
    }

    try {
        const payload = (jwt.verify(req.headers['authorization'], process.env.JWT_KEY!)) as JwtPayload;
        const user: any = await authenticationService.verifyUser(payload.email);
        req.currentUser = user;
    } catch (err) {
        return next(err)
    }

    next()
}